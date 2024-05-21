function InputBox({ label, placeholder, onChange }) {
  return (
    <div>
      <div className=" text-sm font-medium text-left py-2">{label}</div>
      <input onChange={onChange}
        type="text"
        className=" w-full px-2 py-1 rounded border border-slate-300"
        placeholder={placeholder}
      />
    </div>
  );
}

export default InputBox;
