import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

export const Header = () => {
  return (
    <h1 className="flex items-center h-10 m-8 border-b-4 border-indigo-500 ">
      <span className="text-3xl ms-10 me-3">Calendar</span>
      <CalendarMonthIcon />
    </h1>
  );
};
