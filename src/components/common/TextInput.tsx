interface TextInputProps {
    id: string;
    type: string;
    placeholder?: string;
    label: string;
    value? : string;
    name?: string;
    className?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    readOnly?: boolean;
  }
  
  const TextInput: React.FC<TextInputProps> = ({ id, type, label, value, name, readOnly, className, onChange }) => {
    return (
      <div className="mb-4">
        <label htmlFor={id} className="block text-xs md:text-sm  text-ffgray/70 mb-1">{label}</label>
        <input type={type} id={id} value={value} name={name} readOnly={readOnly}  className={`${className} w-full rounded-full border border-black/40 rounded-10 p-3 outline-none focus:border-[#00F0FF]`} onChange={onChange}/>
      </div>
    );
  };

  export default TextInput;