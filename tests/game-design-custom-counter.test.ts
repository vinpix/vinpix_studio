import assert from "node:assert/strict";
import { test } from "node:test";
import { createMapDoc, exportMapJson, importMapJson, setObjectLabel } from "../src/features/game-design/mapDoc";

test("custom counter label round-trips through export / import", () => {
  let doc = createMapDoc({ id: "t", name: "t", width: 4, height: 4, objects: [{ id: "c", key: "custom_counter", gx: 1, gy: 1, rot: 0 }] });
  doc = setObjectLabel(doc, "c", "  Lò pizza ");
  assert.equal(doc.objects[0].label, "Lò pizza");
  const json = exportMapJson(doc);
  assert.equal(json.objects[0].label, "Lò pizza");
  assert.equal(json.objects[0].object_type, "custom_counter");
  const back = importMapJson(JSON.parse(JSON.stringify(json)));
  assert.equal(back.doc.objects[0].label, "Lò pizza");
  assert.equal(setObjectLabel(doc, "c", "").objects[0].label, undefined);
});

test("several custom counters keep their own labels through export / import", () => {
  let doc = createMapDoc({
    id: "t2",
    name: "t2",
    width: 6,
    height: 6,
    objects: [
      { id: "a", key: "custom_counter", gx: 0, gy: 0, rot: 0 },
      { id: "b", key: "custom_counter", gx: 1, gy: 0, rot: 90 },
      { id: "c", key: "custom_counter", gx: 0, gy: 2, rot: 0 },
      { id: "d", key: "base_counter", gx: 3, gy: 3, rot: 0 },
    ],
  });
  doc = setObjectLabel(doc, "a", "Lò pizza");
  doc = setObjectLabel(doc, "b", "Quầy sushi");
  doc = setObjectLabel(doc, "c", "Máy pha cà phê");
  const back = importMapJson(JSON.parse(JSON.stringify(exportMapJson(doc)))).doc;
  assert.equal(back.objects.length, 4);
  const labels = back.objects.filter((o) => o.key === "custom_counter").map((o) => [o.gx, o.gy, o.rot, o.label]);
  assert.deepEqual(labels, [
    [0, 0, 0, "Lò pizza"],
    [1, 0, 90, "Quầy sushi"],
    [0, 2, 0, "Máy pha cà phê"],
  ]);
  assert.equal(back.objects.find((o) => o.key === "base_counter")?.label, undefined);
});
