import React from "react";
import { storiesOf } from "@storybook/react";
import { ConfirmationModal } from "./ConfirmationModal";

storiesOf("ConfirmationModal", module).add("Default", () => (
  <ConfirmationModal
    open={true}
    message="Are you sure you want to delete this climbing session?"
    onConfirmClick={() => console.log("confirm clicked")}
    onCancelClick={() => console.log("cancel clicked")}
  />
));
