"use client";

import { Tabs } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaListUl } from "react-icons/fa6";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { MdOutlineViewAgenda } from "react-icons/md";

interface Props {
  content: any;
}

function ViewTab({ content }: Props) {
  const [activeTab, setActiveTab] = useState("calendar");

  useEffect(() => {
    const savedTab = localStorage.getItem("psnote-attend-view");
    if (savedTab) {
      setActiveTab(savedTab);
    }
  }, []);

  const handleTabChange = (value) => {
    setActiveTab(value.value);
    localStorage.setItem("psnote-attend-view", value.value);
  };

  return (
    <Tabs.Root value={activeTab} onValueChange={handleTabChange}>
      <Tabs.List>
        <Tabs.Trigger value="calendar">
          <IoCalendarNumberOutline />
          Calendar
        </Tabs.Trigger>
        <Tabs.Trigger value="card">
          <MdOutlineViewAgenda />
          Card
        </Tabs.Trigger>
        <Tabs.Trigger value="list">
          <FaListUl />
          List
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="calendar">{content.calendar}</Tabs.Content>
      <Tabs.Content value="card">{content.card}</Tabs.Content>
      <Tabs.Content value="list">{content.list}</Tabs.Content>
    </Tabs.Root>
  );
}

export default ViewTab;
