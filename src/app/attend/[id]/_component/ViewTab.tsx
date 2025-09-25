"use client";

import { Tabs } from "@chakra-ui/react";
import { FaListUl } from "react-icons/fa6";
import { IoCalendarNumberOutline } from "react-icons/io5";

interface Props {
  content: any;
}

function ViewTab({ content }: Props) {
  return (
    <Tabs.Root defaultValue="calendar">
      <Tabs.List>
        <Tabs.Trigger value="calendar">
          <IoCalendarNumberOutline />
          Calendar
        </Tabs.Trigger>
        <Tabs.Trigger value="list">
          <FaListUl />
          List
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="calendar">{content.calendar}</Tabs.Content>
      <Tabs.Content value="list">Manage your projects</Tabs.Content>
    </Tabs.Root>
  );
}

export default ViewTab;
