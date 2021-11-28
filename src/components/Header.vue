<template>
  <div id="header" :class="{'is-mobile':isMobile}">
    <el-row type="flex" justify="start">
      <span v-if="isMobile" @click="openDrawer = true" class="menu-icon">
        <img src="@/assets/images/icon-menu.svg" alt="menu-icon">
      </span>

      <span class="logo">sneakers</span>

      <el-menu v-if="!isMobile"
        class="menu" 
        mode="horizontal">
        <el-menu-item index="1">Collections</el-menu-item>
        <el-menu-item index="2">Men</el-menu-item>
        <el-menu-item index="3">Women</el-menu-item>
        <el-menu-item index="4">About</el-menu-item>
        <el-menu-item index="5">Contact</el-menu-item>
      </el-menu>
      <el-drawer
        v-else
        :visible.sync="openDrawer"
        direction="ltr"
        size="70%">
        <div class="drawer-container">
          <div>Collections</div>
          <div>Men</div>
          <div>Women</div>
          <div>About</div>
          <div>Contact</div>
        </div>
      </el-drawer>

      <span class="cart" @click="openCart = true">
        <el-badge :value="amount" :hidden="amount==0">
          <img src="@/assets/images/icon-cart.svg" alt="cart-icon">
        </el-badge>
      </span>
      <span class="avatar" :class="{'is-mobile':isMobile}">
        <img src="@/assets/images/image-avatar.png" alt="avatar">
      </span>
    </el-row>
    <el-divider v-if="!isMobile"></el-divider>

    <!-- Dialog (cart) -->
    <el-dialog
      class="dialog-cart"
      :visible.sync="openCart"
      :show-close="false"
      :modal="false"
      :width="isMobile ? '90%' : '30%'"
      :custom-class="isMobile ? '' : 'dialog-not-center'"
      >
      <template slot="title">
        <h3>Cart</h3>
      </template>
      <template v-if="amount > 0">
        <el-row class="detail" type="flex">
          <img class="cart-pic" src="@/assets/images/image-product-1-thumbnail.jpg" alt="cart-pic">
          <div class="desc">
            Autumn Limited Edition...<br/>
            $125.00 x {{amount}} <b>${{125*amount}}.00</b>
          </div>
          <img @click="amount=0" class="delete-icon" src="@/assets/images/icon-delete.svg" alt="delete-icon">
        </el-row>
        <el-button @click="handleCheckout" class="button-checkout">Checkout</el-button>
      </template>
      <p v-else class="detail-empty">
        Your cart is empty
      </p>
    </el-dialog>
  </div>
</template>

<script>
import { bus } from '@/main.js'
export default {
  name: 'Header',
  props: {
    isMobile: {
      type: Boolean,
      required: true,
    },
    amountChanged: {
      type: Number,
      default: 0,
    }
  },
  data() {
    return {
      openDrawer: false,
      openCart: false,
      amount: 0,
    }
  },
  methods: {
    handleCheckout() {
      this.$message({
        type: 'success',
        message: 'You have checked out with total of $' + this.amount*125
      })
      this.amount=0
      this.openCart=false
    }
  },
  mounted() {
    bus.$on('addToCart', (amount) => this.amount += amount)
  },
}
</script>

<style lang="scss">
#header {
  margin: 0 10rem;
  >.el-row { margin: 1.5rem 0; }
  &.is-mobile { 
    margin: 0 1rem; 
  }
  >.el-row >span {
    cursor: pointer;
    &.menu-icon {
      margin: auto 1rem;
    }
    &.logo {
      text-shadow: 1px 1px grey;
      font-size: 2rem;
      font-weight: 700;
      margin: auto 0;
      padding-bottom: 0.25rem;
    }
    &.cart {
      margin: auto 0;
      margin-right: 1.5rem;
      margin-left: auto;
    }
    &.avatar {
      margin: auto 0;
      >img {
        width: 3rem;
        height: 3rem;
      }
      &.is-mobile >img {
        width: 2rem;
        height: 2rem;
      }
    }
  }
  .el-menu {
    border: 0;
    font-weight: 400;
    margin-left: 3rem;
  }
  .el-divider {
    margin: 0;
  }
  .el-drawer__header>:first-child {
    flex: 0;
  }
  .drawer-container {
    margin: 1rem;
    >div {
      margin: 1.5rem 0;
      text-align: start;
      font-weight: 700;
    }
  }

  // Dialog
  .dialog-cart {
    margin-top: -1rem;
    .dialog-not-center {
      position: absolute;
      right: 4rem;
      top: 0;
    }
    .el-dialog {
      border-radius: 1rem;
      .el-dialog__header {
        padding-top: 1rem;
        margin: 0;
        border-bottom: 1px solid grey;
      }
      .el-dialog__body { padding-top: 0; }
      .detail {
        margin: 2rem 0;
        .cart-pic {
          width: 4rem;
          height: 4rem;
          border-radius: 0.5rem;
          margin-right: 1rem;
        }
        .desc {
          font-weight: 400;
          font-size: 1rem;
          line-height: 1.8rem;
        }
        .delete-icon {
          cursor: pointer;
          width: 1rem;
          height: 1rem;
          margin: auto;
          margin-right: 0;
        }
      }
      .button-checkout {
        background-color: hsl(26, 100%, 55%);
        width: 100%;
        border-radius: 1rem;
        color: white;
        height: 4rem;
        font-size: 1rem;
        font-weight: 700;
      }
      .detail-empty {
        font-weight: 700;
        font-size: 1.2rem;
        margin: auto;
        padding: 4rem;
        text-align: center;
      }
    }
  }
}
</style>