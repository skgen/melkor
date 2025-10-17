---
title: Button
description: A button element with multiple variants for any call to action.
name: Button
navigation.category: generic
category: generic
---

# {{title}}

{{description}}

## Playground

::app-component-playground
---
:name: name
---
::

## Examples

::mk-card
---
data-not-prose: true
---
  ::mk-button
  Click me
  ::
  ::mk-button
  ---
  intent: neutral
  variant: outline
  ---
  Click me
  ::
::

::mk-card
---
data-not-prose: true
---
  ::mk-button
  ---
  intent: neutral
  ---
  Click me
  ::
  ::mk-button
  ---
  intent: neutral
  variant: outline
  ---
  Click me
  ::
::

::mk-card
---
data-not-prose: true
---
  ::mk-button
  ---
  intent: success
  ---
  Click me
  ::
  ::mk-button
  ---
  intent: success
  variant: outline
  ---
  Click me
  ::
::

::mk-card
---
data-not-prose: true
---
  ::mk-button
  ---
  intent: danger
  ---
  Click me
  ::
  ::mk-button
  ---
  intent: danger
  variant: outline
  ---
  Click me
  ::
::

## API

### Props

::app-component-props
---
:name: name
---
::