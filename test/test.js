import test from "ava";
import * as path from "path";
import { rollup } from "rollup";
import blacklist from "..";

const jsFolder = path.join(__dirname, "fixtures");

test("no blacklist patterns", async t => {
    await rollup({
        input: path.join(jsFolder, "main.js"),
        plugins: [blacklist()],
    });
    await rollup({
        input: path.join(jsFolder, "worker.js"),
        plugins: [blacklist()],
    });
    t.truthy(true);
});

test("pattern that doesn't match", async t => {
    await rollup({
        input: path.join(jsFolder, "main.js"),
        plugins: [blacklist([/import-from-worker/])],
    });
    await rollup({
        input: path.join(jsFolder, "worker.js"),
        plugins: [blacklist([/import-from-main/])],
    });
    t.truthy(true);
});

test("pattern that matches 1", async t => {
    await t.throwsAsync(async () => rollup({
        input: path.join(jsFolder, "main.js"),
        plugins: [blacklist([/import-from-main/])],
    }), {
        code: "PLUGIN_ERROR",
        message: /^Blacklisted module "\.\/import-from-main" found in .*main\.js$/
    });
});

test("pattern that matches 2", async t => {
    await t.throwsAsync(async () => rollup({
        input: path.join(jsFolder, "worker.js"),
        plugins: [blacklist([/import-from-worker/])],
    }), {
        code: "PLUGIN_ERROR",
        message: /^Blacklisted module "\.\/import-from-worker" found in .*worker\.js$/
    });
});
