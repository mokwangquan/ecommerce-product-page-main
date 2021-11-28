<template>
  <div id="product-detail" :class="{'is-mobile' : isMobile}">
    <template v-if="!isMobile">
    <div class="images-container">
      <div class="image-display">
        <img @click="openOverlay" :src="getDisplayingImage()" alt="image-display">
      </div>
      <el-row class="image-thumbnails" type="flex" justify="space-between">
        <div class="image-wrapper" :class="{'is-active' : displayingImageId == 1}"
          @click="displayingImageId = 1">
          <img src="@/assets/images/image-product-1-thumbnail.jpg" alt="image-1-thumbnail">
        </div>
        <div class="image-wrapper" :class="{'is-active' : displayingImageId == 2}"
          @click="displayingImageId = 2">
          <img src="@/assets/images/image-product-2-thumbnail.jpg" alt="image-2-thumbnail">
        </div>
        <div class="image-wrapper" :class="{'is-active' : displayingImageId == 3}"
          @click="displayingImageId = 3">
          <img src="@/assets/images/image-product-3-thumbnail.jpg" alt="image-3-thumbnail">
        </div>
        <div class="image-wrapper" :class="{'is-active' : displayingImageId == 4}"
          @click="displayingImageId = 4">
          <img src="@/assets/images/image-product-4-thumbnail.jpg" alt="image-4-thumbnail">
        </div>
      </el-row>
    </div>
    </template>
    <!-- (PIC) Mobile view -->
    <template v-else> 
    <div class="images-container is-mobile">
      <div class="image-display">
        <img :src="getDisplayingImage()" alt="image-display">
        <div class="action">
          <div class="circle previous" @click="changeImage(-1)">
            <img src="@/assets/images/icon-previous.svg" alt="icon-previous">
          </div>
          <div class="circle next" @click="changeImage(1)">
            <img src="@/assets/images/icon-next.svg" alt="icon-next">
          </div>
        </div>
      </div>
    </div>
    </template>
    <div class="detail-container" :class="{'is-mobile' : isMobile}">
      <div class="company">SNEAKER COMPANY</div>
      <div class="title">Fall Limited Edition Sneakers</div>
      <div class="description">
        These low-profile sneakers are your perfect casual wear companion.
        Featuring a durable rubble outer sole, they'll withstand everything the weather can offer.
      </div>
      <div class="discounted-price" :class="{'is-mobile' : isMobile}">
        <span>$125.00</span>
        <div class="discount">50%</div>
      </div>
      <div class="original-price" :class="{'is-mobile' : isMobile}">
        $250.00
      </div>

      <div class="action">
        <div class="amount-wrapper" :class="{'is-mobile' : isMobile}">
          <span class="prefix no-highlight" @click="changeAmount(-1)">&minus;</span>
          <span class="amount no-highlight">{{ amount }}</span>
          <span class="suffix no-highlight" @click="changeAmount(1)">&plus;</span>
        </div>
        <el-button class="button-add" :class="{'is-mobile' : isMobile}" @click="addToCart()">
          <img src="@/assets/images/icon-cart-white.svg" alt="cart-logo">
          Add to cart
        </el-button>
      </div>
    </div>

    <!-- Overlay images -->
    <OverlayImages
      v-if="showOverlay"
      @close="showOverlay = false"
      :clickedId="this.displayingImageId"/>
  </div>
</template>

<script>
import { bus } from '@/main.js'
import OverlayImages from '@/components/OverlayImages.vue'
import { getImage } from '@/utils/helpers'

export default {
  name: 'ProductDetail',
  components: {
    OverlayImages
  },
  props: {
    isMobile: {
      type: Boolean,
      required: true,
    }
  },
  data() {
    return {
      displayingImageId: 1,
      amount: 0,

      showOverlay: false,
    }
  },
  methods: {
    getDisplayingImage() { return getImage(this.displayingImageId) },
    changeAmount(amount) {
      if (this.amount == 0 && amount < 0 ) return
      this.amount += amount
    },
    addToCart() {
      bus.$emit('addToCart', this.amount)
    },
    changeImage(value) {
      this.displayingImageId += value
      if (this.displayingImageId > 4 || this.displayingImageId < 1) {
        this.displayingImageId = this.displayingImageId == 5 ? 1 : 4
      }
    },
    openOverlay() {
      if (this.isMobile) return
      this.showOverlay = true
    }
  },
}
</script>

<style lang="scss">
#product-detail {
  margin: 0 10rem;
  &.is-mobile { 
    margin: 0; 
    padding-bottom: 2rem;
  }
  >.images-container {
    width: 20rem;
    margin: 4rem 3rem;
    display: inline-block;
    >.image-display {
      >img {
        cursor: pointer;
        width: 20rem;
        height: 20rem;
        border-radius: 1rem;
      }
    }
    >.image-thumbnails {
      margin-top: 1rem;
      .image-wrapper {
        cursor: pointer;
        border-radius: 0.5rem;
        height: 3.96rem; // fix the border is not fix in the img
        border: 2px solid transparent;
        &.is-active {
          border: 2px solid hsl(26, 100%, 55%);
          >img {
            opacity: 0.3;
          }
        }
        >img {
          width: 4rem;
          height: 4rem;
          border-radius: 0.5rem;
        }
      }
    }
    &.is-mobile {
      margin: 0;
      width: 100%;
      .image-display {
        position: relative;
        >img {
          width: 100%;
          height: 100%;
          border-radius: 0;
        }
        >.action {
          position: absolute;
          top: 50%;
          left: 1.5rem;
          right: 1.5rem;
          >div.circle {
            display: inline-flex;
            justify-content: center;
            align-items: center;
            background-color: white;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            &.next {
              position: absolute;
              right: 0;
              margin-left: auto;
            }
          }
        }
      }
    }
  }
  .detail-container {
    margin: 6rem 4rem;
    width: 50%;
    display: inline-block;
    vertical-align: top;
    &.is-mobile {
      display: block;
      margin: 1rem;
      width: fit-content;
    }
    >.company {
      color: hsl(26, 100%, 55%);
      font-weight: 700;
      font-size: 0.75rem;
      letter-spacing: 1.5px;
    }
    >.title {
      font-weight: 700;
      margin-top: 1rem;
      font-size: 2.5rem;
    }
    >.description {
      margin: 2rem 0;
      opacity: 0.5;
    }
    >.discounted-price {
      font-weight: 700;
      font-size: 2rem;
      >.discount {
        display: inline-block;
        color: hsl(26, 100%, 55%);
        background-color: hsl(25, 100%, 94%);
        font-size: 1rem;
        margin: 0 1rem;
        padding: 0.15rem 0.35rem;
        border-radius: 0.25rem;
      }
      &.is-mobile {
        display: inline;
        margin-right: 4rem;
      }
    }
    >.original-price {
      margin-top: 0;
      opacity: 0.3;
      font-weight: 700;
      text-decoration: line-through;
      &.is-mobile {  
        display: inline-flex;
      }
    }
    >.action {
      margin-top: 2rem;
      >.amount-wrapper {
        margin-right: 1rem;
        display: inline-block;
        width: 10rem;
        height: 3rem;
        background-color: hsl(223, 64%, 98%);
        border-radius: 1rem;
        text-align: center;
        >* {
          display: inline-flex;
          align-items: center;
          height: 100%;
        }
        >.prefix, >.suffix {
          cursor: pointer;
          margin: auto 1rem;
          font-size: 1.5rem;
          font-weight: 700;
          color: hsl(26, 100%, 55%);
        }
        >.prefix { float: left; }
        >.suffix { float: right; }
        >.amount {
          font-weight: 700;
        }
        &.is-mobile {
          display: block;
          width: 100%;
          margin: 1.5rem 0;
        }
      }
      >.button-add {
        display: inline-block;
        width: 20rem;
        background-color: hsl(26, 100%, 55%);
        color: white;
        font-weight: 700;
        font-size: 1rem;
        border-radius: 1rem;
        img {
          width: 1rem;
          height: 1rem;
          margin-right: 1rem;
        }
        &.is-mobile {
          width: 100%;
        }
      }
      &.is-mobile {
        display: block;
        width: calc(100% - 2rem);
        margin: 1.5rem 0;
      }
    }
  }
}
</style>