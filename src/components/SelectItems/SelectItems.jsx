import useSelect from "../../hooks/useSelect";

const SelectItems = () => {
  const [selects] = useSelect();
  return (
    <div>
      {selects.length ? (
        <h1 className="text-2xl font-bold text-center mt-4"> Selected Posts</h1>
      ) : (
        ""
      )}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 my-12">
        {selects?.map((select) => (
          <div
            key={select._id}
            className="card card-compact w-96 bg-base-100 shadow-xl"
          >
            <figure>
              <img
                className="w-[400px] h-[300px]"
                src={select.image}
                alt="select"
              />
            </figure>
            <div className="card-body">
              <p>{select.details}</p>

              <span>Likes:{select.totalLikes || 0}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectItems;
