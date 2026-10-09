import assert from "node:assert/strict";
import test from "node:test";
import { createElement, type ReactNode } from "react";
import { renderToString } from "react-dom/server";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { BrandHome } from "../src/brand-home";
import { KidHomeV2, ParentDashboardV2 } from "../src/pilot";
import Onboarding from "../src/onboarding";
import { PrivacyPage } from "../src/privacy";

function renderRoute(path: string, page: ReactNode) {
  return renderToString(
    createElement(
      MemoryRouter,
      { initialEntries: [path] },
      createElement(
        Routes,
        null,
        createElement(Route, { path: "*", element: page }),
      ),
    ),
  );
}

test("family setup, child space, parent evidence and privacy render in the selected language", () => {
  const kid = renderRoute("/kid?lang=fr", createElement(KidHomeV2));
  assert.match(kid, /lang="fr" dir="ltr"/);
  assert.match(kid, /Espace d’apprentissage/);
  assert.match(kid, /Bonjour,/);
  assert.match(kid, /<bdi>Explorateur<\/bdi>/);
  assert.match(kid, /href="\/parent\?lang=fr"/);
  assert.match(kid, /Quatre laboratoires interactifs sont disponibles/);

  const parent = renderRoute("/parent?lang=en", createElement(ParentDashboardV2));
  assert.match(parent, /lang="en" dir="ltr"/);
  assert.match(parent, /How <bdi>Explorer<\/bdi> approaches a problem/);
  assert.match(parent, /Delete this browser’s trial record/);
  assert.match(parent, /href="\/kid\?lang=en"/);

  const setup = renderRoute("/onboarding?lang=en", createElement(Onboarding));
  assert.match(setup, /href="\/privacy\?lang=en"/);
  assert.match(setup, /I am the parent or accompanying adult/);

  const privacy = renderRoute("/privacy?lang=fr", createElement(PrivacyPage));
  assert.match(privacy, /Confidentialité pendant l’essai BRKAR/);
  assert.match(privacy, /supprimer les données de l’essai/i);
});

test("English and French landing calls to action keep the adult-supervised setup step", () => {
  const english = renderRoute("/?lang=en", createElement(BrandHome));
  const french = renderRoute("/?lang=fr", createElement(BrandHome));
  assert.match(english, /href="\/onboarding\?lang=en"/);
  assert.match(french, /href="\/onboarding\?lang=fr"/);
  assert.doesNotMatch(french, /some pages remain Arabic|restent en arabe/);
});
