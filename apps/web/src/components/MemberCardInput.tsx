import { RefObject, useImperativeHandle, useRef } from "react";

export interface MemberNumberRef {
  memberNumber: string;
  clearMemberNumber: () => void;
}

interface MemberCardInputProps {
  ref: RefObject<MemberNumberRef>;
}

const MemberCardInput: React.FC<MemberCardInputProps> = ({ ref }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    memberNumber: "",
    clearMemberNumber: () => {
      if (inputRef.current) {
        ref.current.memberNumber = "";
        inputRef.current.value = "";
      }
    },
  }));

  return (
    <div className="flex flex-col p-2 my-2">
      <label htmlFor="member-number">Member Card Number:</label>
      <input
        className="border-1"
        ref={inputRef}
        id="member-number"
        onChange={(event) => (ref.current.memberNumber = event.target.value)}
      />
    </div>
  );
};

export default MemberCardInput;
