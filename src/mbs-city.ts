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
              levelUp("companion", 1);
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
        levelUp("companion", 1);
        WA.player.state[visitKey] = true;
      }
    });
  });
});

export {};
