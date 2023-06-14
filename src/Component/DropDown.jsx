import { Fade } from "react-awesome-reveal";

function DropDown({
  drop,
  items = [],
  children,
  className,
  open = false,
  setOpen,
}) {
  return (
    <div className={`relative ${className}`} onClick={(e) => setOpen(true)}>
      {drop}
      {open && (
        <div className="z-10 absolute w-full translate-y-1 bg-white divide-y divide-gray-100 rounded-md shadow p-2 min-w-44 dark:bg-gray-700">
          <Fade duration={300}>
            {items && items.length > 0 && (
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                {items.map((item) => {
                  return (
                    <li
                      onClick={action}
                      className="block p-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      {item.iconLeft && item.iconLeft}
                      {item.name}
                      {item.iconRight && item.iconRight}
                    </li>
                  );
                })}
              </ul>
            )}
            {children}
          </Fade>
        </div>
      )}
    </div>
  );
}

export default DropDown;
