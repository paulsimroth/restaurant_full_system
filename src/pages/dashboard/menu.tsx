import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MultiValue } from "react-select/dist/declarations/src";
import { selectOptions } from "~/utils/helpers";
import { trpc } from "~/utils/trpc";
import { Categories } from "~/utils/types";

const DynamicSelect = dynamic(() => import("react-select"), { ssr: false });

type Input = {
    name: string
    price: number
    description: string
    categories: MultiValue<{ value: string; label: string }>
}

const initialInput = {
    name: "",
    price: 0,
    description: "",
    categories: [],
}

/**
 * 
 * COMMENTED OUT SECTIONS BELONG TO AWS-S3 Image Upload and are here for possible futute use
 * Please consult AWS S3 Docs as functions are not complete
 */

function menu() {

    const [input, setInput] = useState<Input>(initialInput);
    /* const [preview, setPreview] = useState<string>(''); */
    const [error, setError] = useState<string>('');

    // tRPC
    /* const { mutateAsync: createPresignedUrl } = trpc.admin.createPresignedUrl.useMutation(); */
    const { mutateAsync: addItem } = trpc.admin.addMenuItem.useMutation();
    const { data: menuItems, refetch } = trpc.menu.getMenuItems.useQuery();
    const { mutateAsync: deleteMenuItem } = trpc.admin.deleteMenuItem.useMutation();

    /*     useEffect(() => {
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
    
            Object.entries(data).forEach(([key, value]: any) => {
                formData.append(key, value);
            });
    
            await fetch(url, {
                method: 'POST',
                body: formData,
            });
    
            return key;
        }; */

    const addMenuItem = async () => {
        /* const key = await handleImageUpload();
        if (!key) throw new Error('No valid Key'); */

        await addItem({
            name: input.name,
            description: input.description,
            categories: input.categories.map((c) => c.value as Exclude<Categories, 'all'>),
            price: input.price,
        });

        refetch();

        /*         //Reset Inputs and Preview
                setInput(initialInput);
                setPreview(''); */
    };

    const handleDelete = async (id: string) => {
        await deleteMenuItem({ id })
        refetch()
    };

    return (
        <>
            <Head>
                <title>Admin Dashboard</title>
                <meta name="description" content="Admin Dashboard" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <div className="z-40 fixed bg-[#1C2331] text-[#FFA500] left-0 top-0 w-full border-b-4 border-[#FFA500] pb-8 pt-8 flex flex-row justify-around items-center">
                    <Link href="/" className='cursor-pointer'>
                        <Image
                            src="/placeholder.png"
                            alt="logo"
                            width={60}
                            height={60}
                            className='block rounded-md object-contain'
                        />
                    </Link>
                    <div className="flex flex-row items-center justify-between w-[30vw]">
                        <Link
                            href="/dashboard/opening"
                            className="m-2 flex items-center h-fit border-2 border-[#FFA500] py-1 px-4 gap-[12px] text-[20px] font-bold hover:scale-110 hover:bg-[#7EC699] hover:text-[#2E3A59] duration-300">
                            Opening Hours
                        </Link>
                        <Link
                            href="/dashboard/menu"
                            className="m-2 flex items-center h-fit border-2 border-[#FFA500] py-1 px-4 gap-[12px] text-[20px] font-bold hover:scale-110 hover:bg-[#7EC699] hover:text-[#2E3A59] duration-300">
                            Menu
                        </Link>
                        <Link
                            href="/dashboard/tables"
                            className="m-2 flex items-center h-fit border-2 border-[#FFA500] py-1 px-4 gap-[12px] text-[20px] font-bold hover:scale-110 hover:bg-[#7EC699] hover:text-[#2E3A59] duration-300">
                            Bookings
                        </Link>
                    </div>
                </div>

                <div className="flex h-fit flex-col items-center justify-center pt-36 text-[#2E3A59]">
                    <h1 className='mt-16 text-[50px] md:text-[70px] font-semibold'>Menu Dashboard</h1>
                    <div className="mx-auto flex w-2/3 flex-col gap-2">
                        <input
                            name="name"
                            className="h-12 p-2 rounded-sm border-none bg-gray-200"
                            type="text"
                            placeholder="name"
                            onChange={(e) => setInput((prev) => ({ ...prev, name: e.target.value }))}
                            value={input.name}
                        />

                        <input
                            name="price"
                            className="h-12 p-2 rounded-sm border-none bg-gray-200"
                            type="number"
                            placeholder="price"
                            onChange={(e) => setInput((prev) => ({ ...prev, price: Number(e.target.value) }))}
                        />

                        <textarea
                            name="description"
                            className="h-12 p-2 rounded-sm border-none bg-gray-200"
                            placeholder="description"
                            onChange={(e) => setInput((prev) => ({ ...prev, description: e.target.value }))}
                            value={input.description}
                        />

                        <DynamicSelect
                            value={input.categories}
                            //@ts-ignore
                            onChange={(e) => setInput((prev) => ({ ...prev, categories: e }))}
                            isMulti
                            className="h-12"
                            options={selectOptions}
                        />

                        {/*                         <label
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
                        </label> */}

                        <button
                            className='h-12 rounded-sm bg-gray-200 disabled:cursor-not-allowed'
                            disabled={!input.name}
                            onClick={addMenuItem}>
                            Add menu item
                        </button>
                    </div>
                    {error && <p className='text-xs text-red-600'>{error}</p>}

                    <div className='mx-auto mt-12 max-w-7xl'>
                        <p className='text-lg font-bold m-2'>Your menu items:</p>
                        <div className='mt-6 mb-12 grid grid-cols-4 gap-8'>
                            {menuItems?.map((menuItem) => (
                                <div key={menuItem.id} className="m-1 p-1 border border-black">
                                    <p className="font-bold">{menuItem.name}</p>
                                    <p>€{menuItem.price}</p>
                                    <p>{menuItem.description}</p>
                                    {/*                                     <div className='relative h-40 w-40'>
                                        <Image priority fill alt='' src={menuItem.url} />
                                    </div> */}
                                    <button
                                        onClick={() => handleDelete(menuItem.id)}
                                        className='text-xs text-red-500 border-red-500 border-2 p-1 rounded-md hover:scale-110 duration-300 hover:text-white hover:bg-red-500'>
                                        Delete
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