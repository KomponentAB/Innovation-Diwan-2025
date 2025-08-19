/// <reference types="@workadventure/iframe-api-typings" />

import { levelUp } from "@workadventure/quests";
import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log("Script started successfully");

// Waiting for the API to be ready
WA.onInit()
  .then(() => {
    console.log("Scripting API ready");
    console.log("Player tags: ", WA.player.tags);

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra()
      .then(() => {
        console.log("MBS City Scripting API Extra ready");
      })
      .catch((e) => console.error(e));
  })
  .catch((e) => console.error(e));

async function incrementCompanionProgress() {
  try {
    const currentProgress = Number(WA.player.state.companionProgress) || 0;
    WA.player.state.companionProgress = currentProgress + 1;
    levelUp("companion", 1);
    console.log(
      `Companion progress incremented to: ${WA.player.state.companionProgress}`
    );
  } catch (error) {
    console.error("Error incrementing companion progress:", error);
  }
}

let companionProgress = 0; // Initialize companionProgress

// Watch for changes to companionProgress using WA.player.onVariableChange
WA.player.state
  .onVariableChange("companionProgress")
  .subscribe(async (value) => {
    companionProgress = value as number;

    try {
      if (companionProgress === 1) {
        await updateMemberTags("lvl1");
      } else if (companionProgress === 6) {
        await updateMemberTags("lvl2");
      } else if (companionProgress === 12) {
        await updateMemberTags("lvl3");
      }
    } catch (err) {
      console.error("Error updating member:", err);
    }
  });

const API_BASE =
  "https://admin.workadventu.re/api/v1/worlds/innovation-diwan-2025";
const MEMBER_ID = "91169e8f-4a26-447d-9243-a6c7af30fffb";
const API_TOKEN =
  "7d26150312868440fc230d8abc3964b95521aed5e61809e53f53c385ac6b545c";

// Function to update tags
async function updateMemberTags(level: "lvl1" | "lvl2" | "lvl3") {
  const url = `${API_BASE}/members/${MEMBER_ID}`;

  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      Authorization: API_TOKEN, // no Bearer prefix
      Accept: "application/json",
      "Content-Type": "application/merge-patch+json",
    },
    body: JSON.stringify({ tags: [level] }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Request failed: ${response.status} ${response.statusText}\n${errorText}`
    );
  }

  const data = await response.json();
  console.log("Updated member:", data);
}

WA.onInit().then(() => {
  if (WA.player.state.companionProgress === 1) {
    WA.chat.sendChatMessage(
      "congratulations, you've unlocked your first level of your companion. Navigate to the menu on top of your screen, select  'Add companion' and choose your companion",
      "Dr. Aida"
    );
    WA.chat.sendChatMessage(
      `
![Companion Level 1 Unlocked](https://media.cleanshot.cloud/media/94698/hmqGflL1hnnhqcEM6fpWFc91BHeJvJKEAsB42ZZe.jpeg?Expires=1755620926&Signature=mAY5pW3DlY7iQES2vnMQso-xUJK63W1pdd1LHloDr56-r4oplN~eX8Wc9oJuSwcGEKbI~YqxjuMF-EoqXJr7sHJy~Mv1G3RYjJGjUV4YfgjUScEHbBTBfve5L1fLV3pkU0auuCuS0G~FY~S882IdaMbdDHcmx-5cyAI0IaAuGGac4hq7JyNHgCFDYqUxrfv15oTxH2ZVW9VPNJFkGqCaj~IliKyAKUJkVLblGiJxHHNG3YYw-jejG55CCoMKM0cF8fztJQoSI22LmQ6b81w-m~LND9TwIFtSlxKstNPOBdSW~n26cz6zZDSep21CVwUqzcJlzn-7KQBHdTEY7gbaVA__&Key-Pair-Id=K269JMAT9ZF4GZ)
      `,
      "Dr. Aida"
    );
    if (Number(WA.player.state.companionProgress) === 6) {
      WA.chat.sendChatMessage(
        "congratulations, you've unlocked your second level of your companion. Navigate to the menu on top of your screen, select  'Add companion' and choose your companion",
        "Dr. Aida"
      );
      WA.chat.sendChatMessage(
        `
![Companion Level 1 Unlocked](https://media.cleanshot.cloud/media/94698/hmqGflL1hnnhqcEM6fpWFc91BHeJvJKEAsB42ZZe.jpeg?Expires=1755620926&Signature=mAY5pW3DlY7iQES2vnMQso-xUJK63W1pdd1LHloDr56-r4oplN~eX8Wc9oJuSwcGEKbI~YqxjuMF-EoqXJr7sHJy~Mv1G3RYjJGjUV4YfgjUScEHbBTBfve5L1fLV3pkU0auuCuS0G~FY~S882IdaMbdDHcmx-5cyAI0IaAuGGac4hq7JyNHgCFDYqUxrfv15oTxH2ZVW9VPNJFkGqCaj~IliKyAKUJkVLblGiJxHHNG3YYw-jejG55CCoMKM0cF8fztJQoSI22LmQ6b81w-m~LND9TwIFtSlxKstNPOBdSW~n26cz6zZDSep21CVwUqzcJlzn-7KQBHdTEY7gbaVA__&Key-Pair-Id=K269JMAT9ZF4GZ)
      `,
        "Dr. Aida"
      );
    }
    if (Number(WA.player.state.companionProgress) === 12) {
      WA.chat.sendChatMessage(
        "congratulations, you've unlocked your third level of your companion. Navigate to the menu on top of your screen, select  'Add companion' and choose your companion",
        "Dr. Aida"
      );
      WA.chat.sendChatMessage(
        `
![Companion Level 1 Unlocked](https://media.cleanshot.cloud/media/94698/hmqGflL1hnnhqcEM6fpWFc91BHeJvJKEAsB42ZZe.jpeg?Expires=1755620926&Signature=mAY5pW3DlY7iQES2vnMQso-xUJK63W1pdd1LHloDr56-r4oplN~eX8Wc9oJuSwcGEKbI~YqxjuMF-EoqXJr7sHJy~Mv1G3RYjJGjUV4YfgjUScEHbBTBfve5L1fLV3pkU0auuCuS0G~FY~S882IdaMbdDHcmx-5cyAI0IaAuGGac4hq7JyNHgCFDYqUxrfv15oTxH2ZVW9VPNJFkGqCaj~IliKyAKUJkVLblGiJxHHNG3YYw-jejG55CCoMKM0cF8fztJQoSI22LmQ6b81w-m~LND9TwIFtSlxKstNPOBdSW~n26cz6zZDSep21CVwUqzcJlzn-7KQBHdTEY7gbaVA__&Key-Pair-Id=K269JMAT9ZF4GZ)
      `,
        "Dr. Aida"
      );
    }
  }
});

WA.onInit().then(() => {
  WA.player.state.onVariableChange("companionProgress").subscribe((value) => {
    if (value === 1) {
      WA.chat.sendChatMessage("we are refreshing your page", "Dr. Aida");
      setTimeout(() => {
        WA.nav.goToPage(
          "https://play.workadventu.re/_/6jxklszz2gs/localhost:5173/MBS-City.tmj"
        );
      }, 6000);
    } else if (value === 6) {
      WA.chat.sendChatMessage("we are refreshing your page", "Dr. Aida");
      setTimeout(() => {
        WA.nav.goToPage(
          "https://play.workadventu.re/_/6jxklszz2gs/localhost:5173/MBS-City.tmj"
        );
      }, 1000);
    } else if (value === 12) {
      WA.chat.sendChatMessage("we are refreshing your page", "Dr. Aida");
      setTimeout(() => {
        WA.nav.goToPage(
          "https://play.workadventu.re/_/6jxklszz2gs/localhost:5173/MBS-City.tmj"
        );
      }, 1000);
    }
  });
});

type AreaTeleport = {
  area: string;
  coords: { x: number; y: number }[];
};

const teleports: AreaTeleport[] = [
  {
    area: "toInnovatorRoom",
    coords: [
      { x: 4570, y: 753 },
      { x: 4680, y: 787 },
    ],
  },
  {
    area: "fromInnovatorRoom",
    coords: [
      { x: 2625, y: 879 },
      { x: 2745, y: 912 },
    ],
  },
  {
    area: "toResearchRoom1",
    coords: [
      { x: 320, y: 3192 },
      { x: 391, y: 3219 },
    ],
  },
  {
    area: "fromResearchRoom1",
    coords: [
      { x: 259, y: 1607 },
      { x: 330, y: 1634 },
    ],
  },
  {
    area: "toResearchRoom2",
    coords: [
      { x: 763, y: 2711 },
      { x: 834, y: 2738 },
    ],
  },
  {
    area: "fromResearchRoom2",
    coords: [
      { x: 554, y: 1278 },
      { x: 626, y: 1305 },
    ],
  },
  {
    area: "toResearchRoom3",
    coords: [
      { x: 1219, y: 3142 },
      { x: 1290, y: 3169 },
    ],
  },
  {
    area: "fromResearchRoom3",
    coords: [
      { x: 867, y: 1607 },
      { x: 938, y: 1634 },
    ],
  },
  {
    area: "toMentorRoom",
    coords: [
      { x: 4065, y: 2578 },
      { x: 4175, y: 2612 },
    ],
  },
  {
    area: "fromMentorRoom",
    coords: [
      { x: 2790, y: 1391 },
      { x: 2909, y: 1426 },
    ],
  },
  {
    area: "toPrayerRoom",
    coords: [
      { x: 2386, y: 3313 },
      { x: 2496, y: 3347 },
    ],
  },
  {
    area: "fromPrayerRoom",
    coords: [
      { x: 1511, y: 1067 },
      { x: 1630, y: 1102 },
    ],
  },
  {
    area: "toChallengeRoom",
    coords: [
      { x: 3586, y: 1106 },
      { x: 3677, y: 1150 },
    ],
  },
  {
    area: "fromChallengeRoom",
    coords: [
      { x: 2273, y: 1296 },
      { x: 2390, y: 1331 },
    ],
  },
];

function pickRandomCoord(
  coords: { x: number; y: number }[]
): { x: number; y: number } | undefined {
  if (!coords.length) return undefined;
  return coords[Math.floor(Math.random() * coords.length)];
}

WA.onInit().then(() => {
  teleports.forEach(({ area, coords }) => {
    WA.room.area.onEnter(area).subscribe(() => {
      const coord = pickRandomCoord(coords);
      if (coord) WA.player.teleport(coord.x, coord.y);
    });
  });
});

// Quest 1 Logic
WA.onInit().then(() => {
  WA.room.area.onEnter("quest1").subscribe(() => {
    if (WA.player.state["quest1"] === "solved") {
      WA.chat.sendChatMessage(
        "Thank you for speaking with me earlier! Your journey has begun. I hope you and your companion like eachother",
        "Dr. Aida"
      );
    } else {
      WA.chat.sendChatMessage("welcome to the companion journey", "Dr. Aida");
      const triggerMessage = WA.ui.displayActionMessage({
        message: "Press [SPACE] to speak with Dr. Aida.",
        callback: () => {
          incrementCompanionProgress();
          WA.chat.sendChatMessage(
            "Welcome! Your journey begins now. Best of luck! I hope you and your companion like eachother",
            "Dr. Aida"
          );
          WA.player.state.quest1 = "solved";
          triggerMessage.remove();
        },
      });
      WA.room.area.onLeave("quest1").subscribe({
        next: () => {
          WA.chat.close();
        },
      });
    }
  });
});

// Quest 2 logic
WA.onInit().then(() => {
  WA.room.area.onEnter("quest2").subscribe(() => {
    const playerName: string = WA.player.name || "Player";
    WA.chat.sendChatMessage(
      `Hello, ${playerName}! Can you help me please?`,
      "Barber"
    );
    const triggerMessage = WA.ui.displayActionMessage({
      message: "Press [SPACE] to talk to Barber.",
      callback: async () => {
        await WA.nav.openCoWebSite(
          "https://komponentab.github.io/Innovation-Diwan-2025/balancedMeal.html",
          true,
          "",
          70,
          1,
          true,
          true
        );
        triggerMessage.remove();
      },
    });
  });
});

// Quest 3 logic
WA.onInit().then(() => {
  WA.room.area.onEnter("quest3").subscribe({
    next: () => {
      const playerName: string = WA.player.name;
      if (WA.player.state["quest3"] === "solved") {
        WA.chat.sendChatMessage(
          `Thank you for your help ${playerName}!`,
          "Barber"
        );
      } else if (WA.player.state["quest3"] === "started") {
        WA.chat.sendChatMessage(
          "Ive must have lost my scissors at a table somewhere nearby.",
          "Barber"
        );
      } else {
        WA.chat.sendChatMessage(
          `Hello, ${playerName}! Can you help me please?`,
          "Barber"
        );
        const triggerMessage = WA.ui.displayActionMessage({
          message: "Press [SPACE] to talk to Barber.",
          callback: () => {
            WA.chat.sendChatMessage(
              "Ive must have lost my scissors at a table somewhere nearby.",
              "Barber"
            );
            WA.player.state.quest3 = "started";
            WA.room.showLayer("background/furnitures/scissor");
          },
        });

        WA.room.area.onLeave("quest3").subscribe({
          next: () => {
            triggerMessage.remove();
            WA.chat.close();
          },
        });
      }
    },
  });
});

WA.onInit().then(() => {
  if (WA.player.state.quest3 === "started") {
    WA.room.onEnterLayer("background/furnitures/scissor").subscribe({
      next: () => {
        WA.player.state.quest3 = "solved";
        WA.chat.sendChatMessage("Thanks for finding my scissor", "Barber");
        WA.room.hideLayer("background/furnitures/scissor");
        incrementCompanionProgress();
      },
    });
  } else if (WA.player.state.quest3 !== "solved") {
    WA.room.hideLayer("background/furnitures/scissor");
  }
});

//Quest 5 and 13 Logic
WA.onInit().then(() => {
  const layerMessages: { [layer: string]: string } = {
    researchRoom: "مرحبًا بك في غرفة البحث! هنا يمكنك استكشاف الأفكار الجديدة.",
    gameRoom: "مرحبًا بك في غرفة الألعاب! استمتع بالتحديات والتجارب الممتعة.",
  };

  Object.entries(layerMessages).forEach(([layer, message]) => {
    WA.room.area.onEnter(layer).subscribe(() => {
      const visitKey = `visited_${layer}`;
      if (!WA.player.state[visitKey]) {
        WA.chat.sendChatMessage(message, "Dr. Aida");
        incrementCompanionProgress();
        WA.player.state[visitKey] = true;
      }
    });
  });
});

// Quest 9 Logic

WA.onInit().then(() => {
  const trashTiles = [
    { x: 23, y: 26 },
    { x: 19, y: 61 },
    { x: 96, y: 22 },
    { x: 56, y: 52 },
  ];

  // Helper to generate a unique key for each trash tile
  const getTrashKey = (x: number, y: number) => `trash_${x}_${y}_collected`;

  if (
    WA?.room?.onEnterLayer &&
    WA?.player?.getPosition &&
    WA?.room?.setTiles &&
    WA?.chat?.sendChatMessage &&
    WA?.player?.state
  ) {
    // On player join, remove trash tiles already collected
    trashTiles.forEach(({ x, y }) => {
      const trashKey = getTrashKey(x, y);
      if (WA.player.state[trashKey]) {
        WA.room.setTiles([
          {
            x,
            y,
            tile: null,
            layer: "background/furnitures/trash",
          },
        ]);
      }
    });

    WA.room.onEnterLayer("background/furnitures/trash").subscribe(async () => {
      try {
        const position = await WA.player.getPosition();
        const playerX = position.x;
        const playerY = position.y;
        const tileX = Math.floor(playerX / 32);
        const tileY = Math.floor(playerY / 32);

        // Find nearby trash tile (within 1 tile distance)
        const nearbyTrash = trashTiles.find(
          ({ x, y }) => Math.abs(tileX - x) <= 1 && Math.abs(tileY - y) <= 1
        );

        if (nearbyTrash) {
          const trashKey = getTrashKey(nearbyTrash.x, nearbyTrash.y);
          // Check if player already collected this trash
          if (!WA.player.state[trashKey]) {
            WA.room.setTiles([
              {
                x: nearbyTrash.x,
                y: nearbyTrash.y,
                tile: null,
                layer: "background/furnitures/trash",
              },
            ]);
            WA.player.state[trashKey] = true;

            // Count how many trash have been collected
            const collectedCount = trashTiles.filter(
              ({ x, y }) => WA.player.state[getTrashKey(x, y)]
            ).length;

            if (collectedCount === trashTiles.length) {
              WA.chat.sendChatMessage(
                "رائع! لقد جمعت كل القمامة! لقد حصلت على نقاط خبرة.",
                "Dr. Aida"
              );
              console.log("Level up placeholder: All trash collected!");
              incrementCompanionProgress();
            } else {
              WA.chat.sendChatMessage(
                `لقد التقطت بعض القمامة! (${collectedCount} من 4)`,
                "Dr. Aida"
              );
            }
          }
        }
      } catch (error) {
        console.error("Error handling trash pickup:", error);
      }
    });
  } else {
    console.warn("WA API not available for trash pickup feature.");
  }
});

export {};
