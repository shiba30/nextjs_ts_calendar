import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

export const Header = () => {
  return (
    <h1 className="flex items-center h-10 m-8 border-b-4 border-indigo-500 ">
      <CalendarMonthIcon className="ms-5 me-3" />
      <span className="text-3xl">Calendar</span>
    </h1>
  );
};
