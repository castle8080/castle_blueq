import express, { Express } from 'express';
import { Container } from "../../../myopic";
import { ServerRunner } from '../server';

export function configure(c: Container) {
    c.singleton("ServerRunner", async (c) => new ServerRunner(c, 8080));
    c.singleton("Express", async (c) => (await c.get<ServerRunner>("ServerRunner")).app);
}
