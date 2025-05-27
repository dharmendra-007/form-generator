import React,{ReactNode} from "react";
function layout({ childern }: { childern: ReactNode }) {
    return <div className="flex w-full flex-grow mx-auto">
        {childern}
    </div>
}

export default layout