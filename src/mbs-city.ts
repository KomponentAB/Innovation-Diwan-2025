/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');


// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('MBS City Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

type AreaTeleport = {
    area: string;
    coords: { x: number; y: number }[];
};

const teleports: AreaTeleport[] = [
    { area: 'toInnovatorRoom', coords: [ { x: 4570, y: 753 }, { x: 4680, y: 787 } ] },
    { area: 'fromInnovatorRoom', coords: [ { x: 2625, y: 879 }, { x: 2745, y: 912 } ] },
    { area: 'toResearchRoom1', coords: [ { x: 320, y: 3192 }, { x: 391, y: 3219 } ] },
    { area: 'fromResearchRoom1', coords: [ { x: 259, y: 1607 }, { x: 330, y: 1634 } ] },
    { area: 'toResearchRoom2', coords: [ { x: 763, y: 2711 }, { x: 834, y: 2738 } ] },
    { area: 'fromResearchRoom2', coords: [ { x: 554, y: 1278 }, { x: 626, y: 1305 } ] },
    { area: 'toResearchRoom3', coords: [ { x: 1219, y: 3142 }, { x: 1290, y: 3169 } ] },
    { area: 'fromResearchRoom3', coords: [ { x: 867, y: 1607 }, { x: 938, y: 1634 } ] },
    { area: 'toMentorRoom', coords: [ { x: 4065, y: 2578 }, { x: 4175, y: 2612 } ] },
    { area: 'fromMentorRoom', coords: [ { x: 2790, y: 1391 }, { x: 2909, y: 1426 } ] },
    { area: 'toPrayerRoom', coords: [ { x: 2386, y: 3313 }, { x: 2496, y: 3347 } ] },
    { area: 'fromPrayerRoom', coords: [ { x: 1511, y: 1067 }, { x: 1630, y: 1102 } ] },
    { area: 'toChallengeRoom', coords: [ { x: 3586, y: 1106 }, { x: 3677, y: 1150 } ] },
    { area: 'fromChallengeRoom', coords: [ { x: 2273, y: 1296 }, { x: 2390, y: 1331 } ] }
];

const areaLayerMap: Record<string, { show: string; hide: string }> = {
    toInnovatorRoom: { show: "foreground/hideFog/innovator", hide: "foreground/hideFog/city" },
    fromInnovatorRoom: { show: "foreground/hideFog/city", hide: "foreground/hideFog/innovator" },
    toResearchRoom1: { show: "foreground/hideFog/research", hide: "foreground/hideFog/city" },
    fromResearchRoom1: { show: "foreground/hideFog/city", hide: "foreground/hideFog/research" },
    toResearchRoom2: { show: "foreground/hideFog/research", hide: "foreground/hideFog/city" },
    fromResearchRoom2: { show: "foreground/hideFog/city", hide: "foreground/hideFog/research" },
    toResearchRoom3: { show: "foreground/hideFog/research", hide: "foreground/hideFog/city" },
    fromResearchRoom3: { show: "foreground/hideFog/city", hide: "foreground/hideFog/research" },
    toMentorRoom: { show: "foreground/hideFog/mentor", hide: "foreground/hideFog/city" },
    fromMentorRoom: { show: "foreground/hideFog/city", hide: "foreground/hideFog/mentor" },
    toPrayerRoom: { show: "foreground/hideFog/prayer", hide: "foreground/hideFog/city" },
    fromPrayerRoom: { show: "foreground/hideFog/city", hide: "foreground/hideFog/prayer" },
    toChallengeRoom: { show: "foreground/hideFog/challenge", hide: "foreground/hideFog/city" },
    fromChallengeRoom: { show: "foreground/hideFog/city", hide: "foreground/hideFog/challenge" }
};

function pickRandomCoord(coords: { x: number; y: number }[]): { x: number; y: number } | undefined {
    if (!coords.length) return undefined;
    return coords[Math.floor(Math.random() * coords.length)];
}

WA.onInit().then(() => {

    teleports.forEach(({ area, coords }) => {
        WA.room.area.onEnter(area).subscribe(() => {
            const coord = pickRandomCoord(coords);
            if (coord) WA.player.teleport(coord.x, coord.y);

            // Handle fog layers
            const layerAction = areaLayerMap[area];
            if (layerAction) {
                WA.room.showLayer(layerAction.show);
                WA.room.hideLayer(layerAction.hide);
            }
        });
    });
});

export {};
