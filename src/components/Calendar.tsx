"use client";
import { useState } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isToday,
  isSameDay,
} from "date-fns";
import { Header } from "./Header";
import { EventModal } from "./EventModal";

export type Event = {
  title: string;
  date: string;
};

export const Calendar = () => {
  const dayOfWeek = ["日", "月", "火", "水", "木", "金", "土"];
  const [currentMonth, setCurrentMonth] = useState(new Date()); // 予定リストの状態
  const [events, setEvents] = useState<Event[]>([]); // 選択された日付の状態
  const [selectedDate, setSelectedDate] = useState(""); // モーダル表示の状態
  const [modalVisible, setModalVisible] = useState(false); // 現在のイベント（編集中または新規作成中）の状態
  const [currentEvent, setCurrentEvent] = useState({ title: "", date: "" }); // カレンダーの日付を変更する関数
  const [viewMode, setViewMode] = useState("month"); // "month" または "week" で表示モードを管理

  const daysInMonth = () => {
    // その月の全ての日を計算する関数
    const startDay = startOfWeek(startOfMonth(currentMonth));
    const endDay = endOfWeek(endOfMonth(currentMonth));
    return eachDayOfInterval({ start: startDay, end: endDay });
  };

  const saveEvent = (newEvent: Event) => {
    // 予定を追加または更新する関数
    const updatedEvents = events.filter(
      (event) => event.date !== newEvent.date
    );
    setEvents([...updatedEvents, newEvent]);
    setModalVisible(false); // モーダルを閉じる
  };

  const deleteEvent = () => {
    // 予定を削除する関数
    const updatedEvents = events.filter(
      (event) =>
        event.date !== selectedDate || event.title !== currentEvent.title
    );
    setEvents(updatedEvents);
    setCurrentEvent({ title: "", date: "" });
    setModalVisible(false);
  };

  const openModal = (date: string) => {
    // モーダルを開く関数
    setSelectedDate(date);
    const eventForDate = events.find((event) => event.date === date);
    if (eventForDate) {
      setCurrentEvent(eventForDate);
    } else {
      setCurrentEvent({ title: "", date });
    }
    setModalVisible(true);
  };

  const daysInView = () => {
    // 現在の表示モードに応じた日付の範囲を計算
    if (viewMode === "week") {
      const start = startOfWeek(currentMonth);
      const end = endOfWeek(start);
      return eachDayOfInterval({ start, end });
    } else {
      // 月表示の場合の日付範囲の計算
      const startDay = startOfWeek(startOfMonth(currentMonth));
      const endDay = endOfWeek(endOfMonth(currentMonth));
      return eachDayOfInterval({ start: startDay, end: endDay });
    }
  };

  return (
    <>
      <Header />
      <div className="flex justify-center items-center">
        <button className="me-5" onClick={() => setViewMode("week")}>
          【 週表示 】
        </button>
        <button onClick={() => setViewMode("month")}>【 月表示 】</button>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex justify-between items-center w-full max-w-4xl p-4 shadow-md">
          <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
            ＜
          </button>
          <span>{format(currentMonth, "yyyy年MM月")}</span>
          <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
            ＞
          </button>
        </div>

        <div className="grid grid-cols-7 gap-4 w-full max-w-4xl">
          {/* 曜日の表示 */}
          {dayOfWeek.map((day, index) => (
            <div key={index} className="text-center">
              {day}
            </div>
          ))}
          {/* 月カレンダー */}
          {viewMode === "month" &&
            daysInView().map((day, index) => {
              const dayStr = format(day, "yyyy-MM-dd"); // 日付を文字列に変換
              const dayEvent = events.find((event) => event.date === dayStr); // その日付に対応するイベントを検索

              return (
                <div
                  key={index}
                  className={`text-left p-2 rounded bg-white max-w-[160px] min-h-[85px] ${
                    isToday(day) ? "bg-green-400" : "text-gray-500"
                  }`}
                  onClick={() => openModal(dayStr)} // クリックしたらモーダルを開く
                >
                  {format(day, "d")}
                  {dayEvent && ( // イベントがあれば表示
                    <div className="text-sm mt-2 text-blue-500">
                      {dayEvent.title}
                    </div>
                  )}
                </div>
              );
            })}
          {/* 週カレンダー */}
          {viewMode === "week" &&
            daysInView().map((day, index) => {
              const dayStr = format(day, "yyyy-MM-dd");
              const dayEvent = events.find((event) => event.date === dayStr);
              return (
                <div
                  key={index}
                  className={`text-left p-2 rounded bg-white max-w-[160px] min-h-[500px] ${
                    isToday(day) ? "bg-green-400" : "text-gray-500"
                  }`}
                  onClick={() => openModal(dayStr)}
                >
                  {format(day, "d")}
                  {dayEvent && (
                    <div className="text-sm mt-2 text-blue-500">
                      {dayEvent.title}
                    </div>
                  )}
                </div>
              );
            })}
        </div>

        <EventModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          event={currentEvent}
          onSave={(event) => {
            saveEvent(event);
            setModalVisible(false);
          }}
          onDelete={() => {
            deleteEvent();
            setModalVisible(false);
          }}
        />
      </div>
    </>
  );
};
