/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log("Script started successfully");

let currentPopup: any = undefined;

// Waiting for the API to be ready
WA.onInit()
  .then(() => {
    console.log("Scripting API ready");
    console.log("Player tags: ", WA.player.tags);

    WA.room.area.onEnter("clock").subscribe(() => {
      const today = new Date();
      const time = today.getHours() + ":" + today.getMinutes();
      currentPopup = WA.ui.openPopup("clockPopup", "It's " + time, []);
    });

    WA.room.area.onLeave("clock").subscribe(closePopup);

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra()
      .then(() => {
        console.log("Scripting API Extra ready");
      })
      .catch((e) => console.error(e));
  })
  .catch((e) => console.error(e));

function closePopup() {
  if (currentPopup !== undefined) {
    currentPopup.close();
    currentPopup = undefined;
  }
}

WA.onInit().then(() => {
  WA.controls.disableInviteButton();
  if (
    !["admin", "speaker", "moderator"].some((tag) =>
      WA.player.tags.includes(tag)
    )
  ) {
    WA.controls.disableMapEditor();
  }
  WA.ui.actionBar.addButton({
    id: "map-btn",
    label: "map/خريطة",
    toolTip: "فتح خريطة مصغرة",
    callback: () => {
      WA.ui.modal.openModal({
        title: "Map",
        src: "https://p.interacty.me/55581cf1cfed663b/iframe.html",
        allow: "",
        allowApi: true,
        position: "center",
        // Removed unsupported 'onClose' property
      });
    },
  });
});

export {};
