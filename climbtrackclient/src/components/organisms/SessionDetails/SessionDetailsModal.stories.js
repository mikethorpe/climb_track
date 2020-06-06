import React from "react";
import { SessionDetailsModal } from "./SessionDetailsModal";
import { storiesOf } from "@storybook/react";
import createStore from "../../../dataLayer/store/store";
import Provider from "../../../dataLayer/store/providerWrapper";

const storeWithSelectedSessionAndStyles = {
  userInterface: {
    sessionDetailsModalDisplayed: true,
  },
  climbingSessions: {
    selectedSession: {
      id: 1,
      dateTime: "22th April 2019",
      maxGrade: "7b",
      climbs: [
        { id: 1234, grade: "7a", style: { id: 1, description: "Overhang" } },
        { id: 345215, grade: "7b", style: { id: 2, description: "Slab" } },
      ],
    },
  },
  styles: [
    { id: 1, description: "Overhang" },
    { id: 2, description: "Slab" },
    { id: 3, description: "Arete" },
    { id: 4, description: "Crimpy" },
  ],
};

const store = createStore(storeWithSelectedSessionAndStyles);

storiesOf("SessionDetails", module).add("Default", () => (
  <Provider store={store}>
    <SessionDetailsModal />
  </Provider>
));
