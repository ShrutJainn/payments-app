function Button({ label, onClick }) {
  return (
    <div className=" mt-1">
      <button
        onClick={onClick}
        className=" w-full h-10 text-center bg-slate-800 text-white rounded mt-2"
      >
        {label}
      </button>
    </div>
  );
}

export default Button;
