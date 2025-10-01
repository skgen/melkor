<template>
  <NuxtLayout name="base-layout">
    <template #title>
      Prose
    </template>
    <AppStack col>
      <AppCard>
        <AppProse>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <hr>
          <table>
            <thead>
              <tr>
                <th>Wrestler</th>
                <th>Origin</th>
                <th>Finisher</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Bret "The Hitman" Hart</td>
                <td>Calgary, AB</td>
                <td>Sharpshooter</td>
              </tr>
              <tr>
                <td>Stone Cold Steve Austin</td>
                <td>Austin, TX</td>
                <td>Stone Cold Stunner</td>
              </tr>
              <tr>
                <td>Randy Savage</td>
                <td>Sarasota, FL</td>
                <td>Elbow Drop</td>
              </tr>
              <tr>
                <td>Vader</td>
                <td>Boulder, CO</td>
                <td>Vader Bomb</td>
              </tr>
              <tr>
                <td>Razor Ramon</td>
                <td>Chuluota, FL</td>
                <td>Razor's Edge</td>
              </tr>
            </tbody>
          </table>
        </AppProse>
      </AppCard>

      <AppCard>
        <AppComponentProps name="AppProse" />
      </AppCard>
    </AppStack>
  </NuxtLayout>
</template>
