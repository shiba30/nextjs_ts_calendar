import React, { useState, useEffect } from "react";
import type { Event } from "./Calendar";

export const EventModal = ({
  visible,
  onClose,
  event,
  onSave,
  onDelete,
}: {
  visible: boolean;
  onClose: () => void;
  event: Event;
  onSave: (event: Event) => void;
  onDelete: () => void;
}) => {
  const [title, setTitle] = useState(event.title);
  const [date, setDate] = useState(event.date);

  useEffect(() => {
    setTitle(event.title);
    setDate(event.date); // モーダルが開かれたとき、現在のイベントの日付を設定
  }, [event]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full text-black mb-4"
          placeholder="予定"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 w-full text-black"
          placeholder="日付"
        />
        <div className="flex justify-between mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => onSave({ title, date })}
          >
            保存
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={onDelete}
          >
            削除
          </button>
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            onClick={onClose}
          >
            キャンセル
          </button>
        </div>
      </div>
    </div>
  );
};
