import Image from 'next/image'
import SubHeading from '~/components/SubHeading'

function Chef() {
  return (
    <section className="w-[100vw] px-4 md:px-24 p-6 bg-white text-[#1C2331] flex flex-col md:flex-row items-center justify-center" id="chef">
      <div className='w-[300px] h-[300px] m-4'>
        <Image
          src="/placeholder.png"
          alt="chef"
          width={250}
          height={250}
          className='w-[250px] h-[250px]'
        />
      </div>
      <div className='w-2/3 max-w-[800px]'>
        <SubHeading title="Chef´s Word" />
        <h1 className='m-2 text-[50px] md:text-[70px] text-[#FFA500] font-semibold'>
          What we believe in
        </h1>
        <div>
          <div className='flex justify-start items-end'>
            <Image
              src="/quote.png"
              alt="quote"
              width={47}
              height={40}
              className='w-[47px] h-[40px] mr-4 mb-4'
            />
            <p className='text-justify'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et quam, magni maxime accusamus enim obcaecati incidunt quod eaque, debitis dolorum quas fugit adipisci doloremque molestias numquam, error architecto veritatis quis.</p>
          </div>
          <p className='text-justify'>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto ducimus maxime, amet quod unde vitae necessitatibus quam, enim fugit ipsam alias explicabo dolore dolor doloremque tempora? Dicta vitae pariatur consequuntur.
          </p>
        </div>
        <div className='w-[100%] mt-12'>
          <p className='font-normal text-[32px] leading-[41px] tracking-wider uppercase'>CHEFS NAME</p>
          <p className='italic'>Chef & Founder</p>
          {/* ADD IMAGE WITH SIGNATURE BELOW*/} 
          <Image
            src="/placeholder.png"
            alt="chef"
            width={250}
            height={80}
            className='w-[250px] h-[80px] my-12'
          />
          
        </div>
      </div>
    </section>
  )
}

export default Chef