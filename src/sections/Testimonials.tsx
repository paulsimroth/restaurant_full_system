import Testimonial from '~/components/Testimonial';
import { testimonials } from '../constants';

function Testimonials() {
  return (
    <section className="relative w-full h-fit m-4">
      <h1>Unsere Kunden</h1>
      <div className="flex flex-col md:flex-row duration-500">
        {testimonials.map((testimonial, index) => (
          <Testimonial
            key={testimonial.id}
            {...testimonial}
            index={index}
          />
        ))
        }
      </div>
    </section>
  )
};

export default Testimonials;