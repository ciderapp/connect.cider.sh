<script setup lang="ts">
definePageMeta({
  middleware: ['auth-logged-in'],
})

const client = useKindeClient();

const accounts = [
    "spotify",
    "discord",
]

const {data: data} = await useAsyncData(async () => {
  const token = await client.getToken();
  let linkedAccounts: any = null;
  if (token) {
    linkedAccounts = await fetch('https://api.connect.cider.sh/users/me/linked-accounts', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => res.json());
  } else {
    window.location.reload();
  }

  return {
    token,
    linkedAccounts
  }
});

async function linkAccount(account: string) {
  const link = await $fetch(`https://api.connect.cider.sh/linkaccount?service=${account}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${data.value?.token}`
    }
  });

  window.open(link.url, '_blank');
}

async function unlinkAccount(account: string) {
  const unlink = await fetch(`https://api.connect.cider.sh/users/me/linked-accounts/${account}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${data.value?.token}`
    }
  });

  if (unlink.ok) {
    data.value.linkedAccounts = data.value.linkedAccounts.filter((a: any) => a.service !== account);
  }
}
</script>

<template>
  <div class="dashboard">
    <h1>Welcome, {{ $auth.user.name || $auth.user.given_name }}</h1>

    <q-card v-if="data.token" class="linked-accounts">
      <q-card-section>
        <h2>Linked Accounts</h2>
        <q-list>
          <q-item v-for="account in accounts" :key="account">
            <q-item-section>
              <q-item-label>{{ account }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-btn
                v-if="data.linkedAccounts && data.linkedAccounts.find((a: any) => a.service === account)"
                color="primary"
                label="Unlink"
                @click="unlinkAccount(account)"
              />
              <q-btn
                v-else
                color="primary"
                label="Link"
                @click="linkAccount(account)"
              />
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>

    <div class="account-actions">
      <NuxtLink to="/api/logout" external>
        <q-btn
          color="red"
          label="Logout"
        />
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped lang="scss">
.dashboard {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 5rem;

  h1 {
    font-size: 2.5rem;
    margin: 0;
    font-weight: 500;
  }

  .linked-accounts {
    width: 50%;
    margin-top: 1rem;

    h2 {
      font-size: 1.5rem;
    }
  }
}
</style>