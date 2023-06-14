import { Avatar } from "@mui/material";
import CodePreview from "../../../Component/CodePreview";

function NoteItem() {
  return (
    <div className="p-2 justify-start items-start flex-shrink-0 flex flex-col text-black dark:text-white ckeditor-container">
      <div className="justify-start flex items-center">
        <Avatar alt="huutai"></Avatar>
        <h5 className="font-family font-bold text-xs ml-2">Hữu Tài (Leader)</h5>
      </div>
      <div className="w-full p-2">
        <CodePreview
          code={
            '<h2 style="margin-left:0px;">What do you Like most about dev.to?</h2><p><a href="https://dev.to/t/discuss">#discuss</a><a href="https://dev.to/t/writing">#writing</a><a href="https://dev.to/t/blog">#blog</a></p><p style="margin-left:0;"><i>To be honest, I came here by pure luck - an English assignment in my bachelor program - but I stayed because of the community!</i> 😇</p><p style="margin-left:0;">I feel like it is a safe space were nerds can be nerds, developers can be developers and anyone can be anyone they want to be. It is just a nice corner of the internet where all sorts of techincal and non-technical matters are discussed in a professional way.</p><hr><p style="margin-left:0;">So, what do you like most about <a href="https://dev.to/"><u>dev.to</u></a>? How did you stumble upon it and what was your reason to stay? 🤗</p><p>Image by <a href="https://www.pexels.com/photo/data-codes-through-eyeglasses-577585/"><u>Kevin Ku</u></a>! 🥳a</p>'
          }
        ></CodePreview>
      </div>
    </div>
  );
}

export default NoteItem;
