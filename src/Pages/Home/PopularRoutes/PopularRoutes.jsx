const routes = [
  {
    id: 1,
    route: "Dhaka → Cox’s Bazar",
    image: "https://i.ibb.co.com/8gDRN7BP/coxs-bazar-beach.jpg"
  },
  {
    id: 2,
    route: "Dhaka → Chittagong",
    image: "https://i.ibb.co.com/Q7WzLbGy/images-q-tbn-ANd9-Gc-Rnk-S5gg-Mc4-Cj-VHcut-I4o-KJknnf-SWc-P9ta96u-JALBa-Zhg-s.jpg" 
  },
  {
    id: 3,
    route: "Dhaka → Sylhet",
    image: "https://i.ibb.co.com/LhpmZ5hc/images-q-tbn-ANd9-Gc-Soo74k-Ssfl-Tr-XVyahp-Da-WUk3-O0-IEijkb6-Zg-s.jpg"
  },
  {
    id: 4,
    route: "Dhaka → Rajshahi",
    image: "https://i.ibb.co.com/zhQ8bXxR/images-q-tbn-ANd9-Gc-QDi-BKu-EQs28-A4-NTI-y3m-B3-HR7nai-EJDT77h-A-s.jpg"
  }
];

const PopularRoutes = () => {
  return (
  
    <section className="py-15 bg-gray-200">
      <div className="px-4 w-10/12 mx-auto">
        <h2 className="text-3xl font-bold text-center mb-2">
          Popular Routes
        </h2>
        <p className="text-center text-gray-500 mb-10">
          Most booked travel routes by our users. Discover the most trusted routes with frequent <br/> departures and high customer satisfaction.
Plan your journey faster by choosing routes that thousands of travelers book every day.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {routes.map(item => (
            <div
              key={item.id}
              className="relative rounded-xl overflow-hidden group cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.route}
                className="h-52 w-full object-cover transform group-hover:scale-105 transition"
              />
              <div className="absolute inset-0 bg-black/40 flex items-end">
                <h3 className="text-white text-lg font-semibold p-4">
                  {item.route}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularRoutes;
