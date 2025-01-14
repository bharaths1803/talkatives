const InputBox = ({ labelText, placeholderText, onChange }) => {
  return (
    <div className={`mt-4`}>
      <label class="font-poppins text-lg font-medium leading-[30px] text-left decoration-skip-ink-none">
        {labelText}
      </label>
      <input
        type="text"
        className="w-full size-10 bg-custom-gray shadow-custom-inset-light backdrop-blur-custom-btn rounded-custom pl-3 placeholder:text-gray-600 text-gray-800"
        placeholder={placeholderText}
        onChange={onChange}
      />
    </div>
  );
};

export default InputBox;
