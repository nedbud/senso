interface SortsInterface {
  sorts: {
    name: string;
    slug: string;
  }[];
}

const Sorts: React.FC<SortsInterface> = ({ sorts }) => {
  return (
    <div className="sticky top-24 text-right">
      <p className="text-2xl text-[#CA0508] font-bold pb-4">Sort By</p>
      {sorts.map((item, index) => (
        <a
          key={index}
          className="block cursor-pointer py-1 font-medium text-gray-900 hover:text-[#CA0508]"
        >
          {item.name}
        </a>
      ))}
    </div>
  );
};

export default Sorts;
