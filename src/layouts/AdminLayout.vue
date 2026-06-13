<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>Admin Panel</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above side="left" bordered>
      <q-list>
        <q-item to="/admin" clickable>Dashboard</q-item>
        <q-item to="/admin/products" clickable>Manage Products</q-item>
        <q-item to="/admin/orders" clickable>Manage Orders</q-item>
        <q-item to="/admin/stats" clickable>Statistics</q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
