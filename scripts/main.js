import { rejestrujUstawienia } from "./ustawienia.js";
import { dodajPrzyciskiDoSidebaru } from "./przyciskiWidocznosc.js";

const DIRECTORY_TYPES = {
  ActorDirectory: "actor",
  ItemDirectory: "item",
  JournalDirectory: "journal",
  MacroDirectory: "macro",
  RollTableDirectory: "rolltable",
  actors: "actor",
  items: "item",
  journal: "journal",
  macros: "macro",
  tables: "rolltable"
};

Hooks.once("init", () => {
  rejestrujUstawienia();
});

Hooks.once("ready", () => {
  game.socket?.on("module.show-actor-art", data => {
    if (data?.type === "refresh") Hooks.callAll("refreshSidebarButtons");
  });
});

Hooks.on("renderActorDirectory", (app, html) => dodajPrzyciskiDoSidebaru(html[0] ?? html, "actor"));
Hooks.on("renderItemDirectory", (app, html) => dodajPrzyciskiDoSidebaru(html[0] ?? html, "item"));
Hooks.on("renderJournalDirectory", (app, html) => dodajPrzyciskiDoSidebaru(html[0] ?? html, "journal"));
Hooks.on("renderMacroDirectory", (app, html) => dodajPrzyciskiDoSidebaru(html[0] ?? html, "macro"));
Hooks.on("renderRollTableDirectory", (app, html) => dodajPrzyciskiDoSidebaru(html[0] ?? html, "rolltable"));

Hooks.on("renderApplicationV2", (app, element) => {
  const typ = DIRECTORY_TYPES[app?.constructor?.name] ?? DIRECTORY_TYPES[app?.tabName];
  if (typ) dodajPrzyciskiDoSidebaru(element, typ);
});

Hooks.on("refreshSidebarButtons", () => {
  setTimeout(() => {
    const dirs = new Set([
      ui.actors,
      ui.items,
      ui.journal,
      ui.macros,
      ui.tables,
      ui.sidebar?.tabs?.actors,
      ui.sidebar?.tabs?.items,
      ui.sidebar?.tabs?.journal,
      ui.sidebar?.tabs?.macros,
      ui.sidebar?.tabs?.tables
    ]);

    for (const dir of dirs) {
      dir?.render?.(true);
    }
  }, 10);
});
