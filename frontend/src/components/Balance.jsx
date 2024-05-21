function Balance({ value }) {
  return (
    <div className="flex">
      <div className="font-bold text-lg">Your Balance </div>
      <div className=" font-semibold ml4 text-lg ml-4">Rs {value}</div>
    </div>
  );
}

export default Balance;
