import { HiArrowLeft } from "react-icons/hi";
import { trpc } from "~/utils/trpc";
import Select from "react-select";
import { capitalize, selectOptions } from "~/utils/helpers";
import { useState } from "react";
import { useRouter } from "next/router";

function Menu() {

  const router = useRouter();

  const { data: menuItems } = trpc.menu.getMenuItems.useQuery();
  const [filter, setFilter] = useState<undefined | string>('');

  const filteredMenuItems = menuItems?.filter((menuItem: any) => {
    if (!filter) return true;
    return menuItem.categories.includes(filter);
  })

  return (
    <div className='w-[90vw] h-fit'>
      <div className='mx-auto max-w-2xl py-8 px-4 lg:max-w-full'>
        <div className='flex flex-row w-full items-center justify-between'>
          <h2 className='flex items-center gap-4 text-3xl font-bold tracking-tight text-gray-900'>
            <HiArrowLeft
              className='cursor-pointer hover:scale-150 duration-500 hover:border hover:rotate-45 rounded-full m-2 hover:p-2 w-[35px] h-[35px]'
              onClick={() => router.push('/')}
            />
            On Our Menu
          </h2>
          {/* 
          Here is the selection of categories in the Menu. if they need to be changed they need to be changed in utils 
          */}
          <Select
            onChange={(e) => {
              if (e?.value === 'all') setFilter(undefined)
              else setFilter(e?.value)
            }}
            className='border-none outline-none w-[200px]'
            placeholder='Filter by...'
            options={selectOptions}
          />
        </div>
        <div className='mt-6 flex flex-row flex-wrap items-start justify-start'>
          {filteredMenuItems?.map((menuItem: any) => (
            <div key={menuItem.id} className='group relative p-5 w-[290px] h-fit'>
              {/*               <div className='min-h-80 aspect-w-1 aspect-h-1 lg:aspect-none w-full overflow-hidden rounded-md bg-gray-200 hover:opacity-75 lg:h-80'>
                <div className='relative h-full w-full object-cover object-center lg:h-full lg:w-full'>
                  <Image
                    src={menuItem.url}
                    alt={menuItem.name}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              </div> */}
              <div className='mt-4 flex flex-col justify-between'>
                <div className="flex flex-row justify-between">
                  <div className="flex flex-col">
                    <h3 className='m-1 text-xl text-gray-700 font-bold'>
                      <p>{menuItem.name}</p>
                    </h3>
                    <p className='m-1 text-lg text-gray-500 italic'>
                      {menuItem.categories.map((c: any) => capitalize(c)).join(', ')}
                    </p>
                  </div>
                  <p className='m-1 text-lg font-medium text-gray-900'>€{menuItem.price.toFixed(2)}</p>
                </div>
                <p className="m-1 flex flex-wrap text-justify">{menuItem.description}</p>
              </div>

              {/*               <Button
                className='mt-4'
                onClick={() => {
                  addToCart(menuItem.id, 1)
                }}>
                Add to cart
              </Button> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
};

export default Menu;