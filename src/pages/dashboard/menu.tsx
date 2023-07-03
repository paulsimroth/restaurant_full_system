import Head from "next/head";
import { useEffect, useState } from "react";
import Navbar from "~/sections/Navbar";
import { selectOptions } from "~/utils/helpers";
import { MultiValue } from "react-select/dist/declarations/src";
import Select from "react-select";
import dynamic from "next/dynamic";
import Image from "next/image";
import { maxFileSize } from "~/constants";
import { trpc } from "~/utils/trpc";
import { Categories } from "~/utils/types";

const DynamicSelect = dynamic(() => import("react-select"), { ssr: false });

type Input = {
    name: string
    price: number
    categories: MultiValue<{ value: string; label: string }>
    file: undefined | File
}

const initialInput = {
    name: "",
    price: 0,
    categories: [],
    file: undefined,
}

function menu() {

    const [input, setInput] = useState<Input>(initialInput);
    const [preview, setPreview] = useState<string>('');
    const [error, setError] = useState<string>('');

    // tRPC
    const { mutateAsync: createPresignedUrl } = trpc.admin.createPresignedUrl.useMutation();
    const { mutateAsync: addItem } = trpc.admin.addMenuItem.useMutation();
    const { data: menuItems, refetch } = trpc.menu.getMenuItems.useQuery()

    useEffect(() => {
        //create Preview
        if (!input.file) return;
        const objectUrl = URL.createObjectURL(input.file);
        setPreview(objectUrl);

        //clean up preview
        return () => URL.revokeObjectURL(objectUrl);
    }, [input.file]);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.[0]) return setError('No file selected');
        if (e.target.files[0].size > maxFileSize) return setError('File too big; must be max. 5MB!');
        setInput((prev) => ({ ...prev, file: e.target.files![0] }));
    };

    const handleImageUpload = async () => {
        const { file } = input;
        if (!file) return;

        const { url, fields, key } = await createPresignedUrl({ fileType: file.type });

        const data = {
            ...fields,
            'Content-Type': file.type,
            file
        };

        const formData = new FormData();

        Object.entries(data.forEach(([key, value]: any) => {
            formData.append(key, value);
        }));

        await fetch(url, {
            method: 'POST',
            body: formData,
        });

        return key;
    };

    const addMenuItem = async () => {
        const key = await handleImageUpload();
        if (!key) throw new Error('No valid Key');

        await addItem({
            name: input.name,
            imageKey: key,
            categories: input.categories.map((c) => c.value as Exclude<Categories, 'all'>),
            price: input.price,
        });

        refetch();
        
        //Reset Inputs and Preview
        setInput(initialInput);
        setPreview('');
    };

    const handleDelete = async (imageKey: string, id: string) => {
        
    }

    return (
        <>
            <Head>
                <title>Admin Dashboard</title>
                <meta name="description" content="Admin Dashboard" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <Navbar />

                <div className="flex h-[65vh] flex-col items-center justify-around p-24 text-[#2E3A59]">
                    <h1>menu items</h1>
                    <div className="mx-auto flex max-w-xl flex-col gap-2">
                        <input
                            name="name"
                            className="h-12 rounded-sm border-none bg-gray-200"
                            type="text"
                            placeholder="name"
                            onChange={(e) => setInput((prev) => ({ ...prev, name: e.target.value }))}
                            value={input.name}
                        />

                        <input
                            name="price"
                            className="h-12 rounded-sm border-none bg-gray-200"
                            type="number"
                            placeholder="price"
                            onChange={(e) => setInput((prev) => ({ ...prev, price: Number(e.target.value) }))}
                        />

                        <DynamicSelect
                            value={input.categories}
                            //@ts-ignore
                            onChange={(e) => setInput((prev) => ({ ...prev, categories: e }))}
                            isMulti
                            className="h-12"
                            options={selectOptions}
                        />

                        <label
                            htmlFor='file'
                            className='relative h-12 cursor-pointer rounded-sm bg-gray-200 font-medium text-indigo-600 focus-within:outline-none'>
                            <span className='sr-only'>File input</span>
                            <div className='flex h-full items-center justify-center'>
                                {preview ? (
                                    <div className='relative h-3/4 w-full'>
                                        <Image alt='preview' style={{ objectFit: 'contain' }} fill src={preview} />
                                    </div>
                                ) : (
                                    <span>Select image</span>
                                )}
                            </div>
                            <input
                                name='file'
                                id='file'
                                onChange={handleFileSelect}
                                accept='image/jpeg image/png image/jpg'
                                type='file'
                                className='sr-only'
                            />
                        </label>

                        <button
                            className='h-12 rounded-sm bg-gray-200 disabled:cursor-not-allowed'
                            disabled={!input.file || !input.name}
                            onClick={addMenuItem}>
                            Add menu item
                        </button>
                    </div>
                    {error && <p className='text-xs text-red-600'>{error}</p>}

                    <div className='mx-auto mt-12 max-w-7xl'>
                        <p className='text-lg font-medium'>Your menu items:</p>
                        <div className='mt-6 mb-12 grid grid-cols-4 gap-8'>
                            {menuItems?.map((menuItem) => (
                                <div key={menuItem.id}>
                                    <p>{menuItem.name}</p>
                                    <div className='relative h-40 w-40'>
                                        <Image priority fill alt='' src={menuItem.url} />
                                    </div>
                                    <button
                                        onClick={() => handleDelete(menuItem.imageKey, menuItem.id)}
                                        className='text-xs text-red-500'>
                                        delete
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default menu;