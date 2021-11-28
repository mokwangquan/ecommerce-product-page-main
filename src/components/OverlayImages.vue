<template>
  <div id="overlay-images">
    <div class="image-container no-highlight">
      <div class="image-display">
        <img :src="getDisplayingImage()" alt="image-display">
        <div class="action">
          <img class="button-close" @click="exit" 
            src="@/assets/images/icon-close.svg" alt="close-icon"/>
          <div class="circle previous" @click="changeImage(-1)">
            <img src="@/assets/images/icon-previous.svg" alt="icon-previous">
          </div>
          <div class="circle next"  @click="changeImage(1)">
            <img src="@/assets/images/icon-next.svg" alt="icon-next">
          </div>
        </div>
      </div>
      <el-row class="image-thumbnails" type="flex" justify="center">
        <div class="image-wrapper" :class="{'is-active' : id == 1}"
          @click="id = 1">
          <img src="@/assets/images/image-product-1-thumbnail.jpg" alt="image-1-thumbnail">
        </div>
        <div class="image-wrapper" :class="{'is-active' : id == 2}"
          @click="id = 2">
          <img src="@/assets/images/image-product-2-thumbnail.jpg" alt="image-2-thumbnail">
        </div>
        <div class="image-wrapper" :class="{'is-active' : id == 3}"
          @click="id = 3">
          <img src="@/assets/images/image-product-3-thumbnail.jpg" alt="image-3-thumbnail">
        </div>
        <div class="image-wrapper" :class="{'is-active' : id == 4}"
          @click="id = 4">
          <img src="@/assets/images/image-product-4-thumbnail.jpg" alt="image-4-thumbnail">
        </div>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getImage } from '@/utils/helpers'

export default {
  name: 'OverlayImages',
  props: {
    clickedId: {
      type: Number,
      required: true,
    }
  },
  data () {
    return {
      id: 1,
    }
  },
  methods: {
    getDisplayingImage() { return getImage(this.id) },
    changeImage(value) {
      this.id += value
      if (this.id > 4 || this.id < 1) {
        this.id = this.id == 5 ? 1 : 4
      }
    },
    exit() {
      this.$emit('close')
    }
  },
  mounted() {
    this.id = this.clickedId
  }
}
</script>

<style lang="scss">
#overlay-images {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  .image-container {
    margin: 8rem 15rem;
  }
  .image-display {
    text-align: center;
    position: relative;
    >img {
      width: 25rem;
      height: 25rem;
      border-radius: 1rem;
    }
    >.action {
      position: relative;
      top: -14rem;
      width: 28rem;
      margin: 0 auto;
      >.button-close {
        cursor: pointer;
        position: absolute;
        right: 1.5rem;
        top: -13rem;
      }
      >div.circle {
        cursor: pointer;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        background-color: white;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        &.previous {
          position: absolute;
          left: 0;
        }
        &.next {
          position: absolute;
          right: 0;
        }
      }
    }
  }
  .image-thumbnails  {
    >.image-wrapper {
      margin: 2rem 0.5rem;
      cursor: pointer;
      border-radius: 0.5rem;
      height: 3.96rem; // fix the border is not fix in the img
      border: 2px solid transparent;
      img {
        width: 4rem;
        height: 4rem;
        border-radius: 0.5rem;
      }
      &.is-active {
        border: 2px solid hsl(26, 100%, 55%);
        >img {
          opacity: 0.3;
        }
      }
    }
  }
}
</style>