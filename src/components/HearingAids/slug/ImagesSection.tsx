/* eslint-disable @next/next/no-img-element */
interface ImagesProps {
  name: string;
  images: any;
}

const Images: React.FC<ImagesProps> = ({ images, name }) => {
  return (
    <aside className="col-span-12 lg:col-span-5 h-fit lg:sticky lg:top-24 px-4 pb-4 rounded-md border shadow-lg">
      <div className="flex justify-between py-3">
        <p className="text-[#CA0508] text-xl font-semibold">Photos </p>
        {/* <p className="text-blue-500 cursor-pointer">See all</p> */}
      </div>
      <div className="grid grid-cols-12 gap-2">
        {images.map((image: any, index: number) => (
          <div key={index} className="col-span-4">
            <img
              className="h-[100px] lg:h-[150px] w-[100px] lg:w-[150px] rounded-lg cursor-pointer border hover:border-none hover:scale-150 transition-all delay-50"
              src={image.path}
              alt={name}
            />
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Images;
