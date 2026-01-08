<script setup>
import IsolatedMiniPlayer from '@/components/examples/IsolatedMiniPlayer.vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  example: {
    type: Object,
    required: true
  },
  compact: {
    type: Boolean,
    default: false
  }
})

// Fixed styling for inspiration gallery - completely independent from playground
// Each example uses the default amber color scheme
const defaultPlayerProps = {
  buttonColor: '#c4956a',
  iconColor: '#ffffff',
  borderRadius: '50%',
  size: '48px'
}

// Smaller size for compact mode
const compactPlayerProps = {
  ...defaultPlayerProps,
  size: '36px'
}
</script>

<template>
  <div class="example-block" :class="{ 'example-block--compact': compact }">
    <!-- Header -->
    <div class="example-block__header">
      <span class="example-block__title">{{ title }}</span>
      <span v-if="!compact" class="example-block__description">{{ description }}</span>
    </div>

    <!-- Preview Content -->
    <div class="example-block__preview" :class="{ 'example-block__preview--compact': compact }">
      <!-- Artwork Overlay Example -->
      <template v-if="example.type === 'artwork'">
        <div class="preview-artwork">
          <img :src="example.image" :alt="example.title" class="preview-artwork__image" />
          <div class="preview-artwork__overlay">
            <IsolatedMiniPlayer v-bind="compact ? compactPlayerProps : defaultPlayerProps" />
          </div>
          <div class="preview-artwork__caption">
            <span class="preview-artwork__title">{{ example.title }}</span>
            <span class="preview-artwork__artist">{{ example.artist }}</span>
          </div>
        </div>
      </template>

      <!-- Product Card Example -->
      <template v-else-if="example.type === 'product'">
        <div class="preview-product">
          <div class="preview-product__image-wrap">
            <img :src="example.image" :alt="example.name" class="preview-product__image" />
            <div class="preview-product__player">
              <IsolatedMiniPlayer v-bind="compact ? compactPlayerProps : defaultPlayerProps" />
            </div>
          </div>
          <div class="preview-product__info">
            <h4 class="preview-product__name">{{ example.name }}</h4>
            <p class="preview-product__desc">{{ example.description }}</p>
            <span class="preview-product__price">{{ example.price }}</span>
          </div>
        </div>
      </template>

      <!-- Profile Card Example -->
      <template v-else-if="example.type === 'profile'">
        <div class="preview-profile">
          <div class="preview-profile__cover">
            <img :src="example.cover" alt="Cover" class="preview-profile__cover-img" />
            <div class="preview-profile__player">
              <IsolatedMiniPlayer v-bind="compact ? compactPlayerProps : defaultPlayerProps" />
            </div>
          </div>
          <div class="preview-profile__details">
            <img :src="example.avatar" :alt="example.name" class="preview-profile__avatar" />
            <h4 class="preview-profile__name">{{ example.name }}</h4>
            <span class="preview-profile__role">{{ example.role }}</span>
          </div>
        </div>
      </template>

      <!-- Audio Guide Example -->
      <template v-else-if="example.type === 'guide'">
        <div class="preview-guide">
          <div class="preview-guide__image-wrap">
            <img :src="example.image" :alt="example.title" class="preview-guide__image" />
            <div class="preview-guide__number">{{ example.number }}</div>
            <div class="preview-guide__player">
              <IsolatedMiniPlayer v-bind="compact ? compactPlayerProps : defaultPlayerProps" />
            </div>
          </div>
          <div class="preview-guide__info">
            <h4 class="preview-guide__title">{{ example.title }}</h4>
            <span class="preview-guide__subtitle">{{ example.subtitle }}</span>
            <span class="preview-guide__duration">{{ example.duration }}</span>
          </div>
        </div>
      </template>

      <!-- Seller Intro Example -->
      <template v-else-if="example.type === 'seller'">
        <div class="preview-seller">
          <div class="preview-seller__banner">
            <img :src="example.banner" alt="Shop banner" class="preview-seller__banner-img" />
          </div>
          <div class="preview-seller__content">
            <div class="preview-seller__header">
              <img :src="example.avatar" :alt="example.sellerName" class="preview-seller__avatar" />
              <div class="preview-seller__meta">
                <h4 class="preview-seller__shop">{{ example.shopName }}</h4>
                <span class="preview-seller__seller">{{ example.sellerName }} · {{ example.location }}</span>
              </div>
              <div class="preview-seller__player">
                <IsolatedMiniPlayer v-bind="compact ? compactPlayerProps : defaultPlayerProps" />
              </div>
            </div>
            <p class="preview-seller__tagline">{{ example.tagline }}</p>
            <div class="preview-seller__stats">
              <span class="preview-seller__rating">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                {{ example.rating }}
              </span>
              <span class="preview-seller__reviews">{{ example.reviews }} reviews</span>
            </div>
          </div>
        </div>
      </template>

      <!-- Voice Review Example -->
      <template v-else-if="example.type === 'review'">
        <div class="preview-review">
          <div class="preview-review__header">
            <img :src="example.productImage" :alt="example.productName" class="preview-review__product-img" />
            <div class="preview-review__product-info">
              <h4 class="preview-review__product-name">{{ example.productName }}</h4>
              <div class="preview-review__stars">
                <svg v-for="n in example.rating" :key="n" width="14" height="14" viewBox="0 0 24 24" fill="#facc15"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
              </div>
            </div>
          </div>
          <div class="preview-review__voice">
            <div class="preview-review__avatar-wrap">
              <img :src="example.customerAvatar" :alt="example.customerName" class="preview-review__customer-avatar" />
              <div class="preview-review__player">
                <IsolatedMiniPlayer v-bind="compact ? compactPlayerProps : defaultPlayerProps" />
              </div>
            </div>
            <div class="preview-review__customer-info">
              <span class="preview-review__customer-name">{{ example.customerName }}</span>
              <span v-if="example.verified" class="preview-review__verified">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                Verified Purchase
              </span>
            </div>
          </div>
          <div class="preview-review__footer">
            <span class="preview-review__date">{{ example.date }}</span>
            <span class="preview-review__helpful">{{ example.helpful }} found this helpful</span>
          </div>
        </div>
      </template>

      <!-- Team Member Example -->
      <template v-else-if="example.type === 'team'">
        <div class="preview-team">
          <div class="preview-team__photo-wrap">
            <img :src="example.headshot" :alt="example.name" class="preview-team__photo" />
            <div class="preview-team__player">
              <IsolatedMiniPlayer v-bind="compact ? compactPlayerProps : defaultPlayerProps" />
            </div>
          </div>
          <div class="preview-team__info">
            <h4 class="preview-team__name">{{ example.name }}</h4>
            <span class="preview-team__title">{{ example.title }}</span>
            <div class="preview-team__meta">
              <span class="preview-team__dept">{{ example.department }}</span>
              <span class="preview-team__joined">{{ example.joined }}</span>
            </div>
          </div>
        </div>
      </template>

      <!-- Chat/Voice Message Example -->
      <template v-else-if="example.type === 'chat'">
        <div class="preview-chat">
          <div class="preview-chat__bubble" :class="{ 'preview-chat__bubble--support': example.isSupport }">
            <div class="preview-chat__header">
              <img :src="example.senderAvatar" :alt="example.senderName" class="preview-chat__avatar" />
              <div class="preview-chat__sender-info">
                <span class="preview-chat__sender">{{ example.senderName }}</span>
                <span class="preview-chat__time">{{ example.timestamp }}</span>
              </div>
            </div>
            <div class="preview-chat__voice-row">
              <IsolatedMiniPlayer v-bind="compact ? compactPlayerProps : defaultPlayerProps" />
              <span class="preview-chat__duration">{{ example.duration }}</span>
            </div>
          </div>
        </div>
      </template>

      <!-- Property Listing Example -->
      <template v-else-if="example.type === 'property'">
        <div class="preview-property">
          <div class="preview-property__image-wrap">
            <img :src="example.image" alt="Property" class="preview-property__image" />
            <span class="preview-property__price">{{ example.price }}</span>
          </div>
          <div class="preview-property__content">
            <h4 class="preview-property__address">{{ example.address }}</h4>
            <span class="preview-property__city">{{ example.city }}</span>
            <div class="preview-property__specs">
              <span>{{ example.beds }} bd</span>
              <span>{{ example.baths }} ba</span>
              <span>{{ example.sqft }} sqft</span>
            </div>
            <div class="preview-property__agent">
              <img :src="example.agentAvatar" :alt="example.agentName" class="preview-property__agent-avatar" />
              <div class="preview-property__agent-info">
                <span class="preview-property__agent-name">{{ example.agentName }}</span>
                <span class="preview-property__agent-title">{{ example.agentTitle }}</span>
              </div>
              <div class="preview-property__player">
                <IsolatedMiniPlayer v-bind="compact ? compactPlayerProps : defaultPlayerProps" />
              </div>
            </div>
          </div>
        </div>
      </template>

      <!-- Chef's Menu Note Example -->
      <template v-else-if="example.type === 'menu'">
        <div class="preview-menu">
          <div class="preview-menu__image-wrap">
            <img :src="example.dishImage" :alt="example.dishName" class="preview-menu__image" />
            <span v-if="example.badge" class="preview-menu__badge">{{ example.badge }}</span>
          </div>
          <div class="preview-menu__content">
            <div class="preview-menu__header">
              <h4 class="preview-menu__dish">{{ example.dishName }}</h4>
              <span class="preview-menu__price">{{ example.price }}</span>
            </div>
            <p class="preview-menu__desc">{{ example.description }}</p>
            <div class="preview-menu__chef">
              <div class="preview-menu__player">
                <IsolatedMiniPlayer v-bind="compact ? compactPlayerProps : defaultPlayerProps" />
              </div>
              <span class="preview-menu__chef-label">Hear from {{ example.chefName }}</span>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.example-block {
  border: 1px solid var(--ff-border);
  border-radius: 8px;
  overflow: hidden;
  background: var(--ff-bg);
}

.example-block__header {
  padding: var(--ff-space-md) var(--ff-space-lg);
  border-bottom: 1px solid var(--ff-border);
}

.example-block__title {
  display: block;
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--ff-text);
  margin-bottom: 0.25rem;
}

.example-block__description {
  font-size: 0.8125rem;
  color: var(--ff-muted);
}

/* Preview */
.example-block__preview {
  padding: var(--ff-space-xl);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 280px;
  background: #f5f5f5;
}

/* Preview Example Styles - Full Width */
.preview-artwork {
  position: relative;
  width: 100%;
  max-width: 500px;
  border-radius: 8px;
  overflow: visible;
}

.preview-artwork__image {
  width: 100%;
  height: 280px;
  object-fit: cover;
  display: block;
  border-radius: 8px 8px 0 0;
}

.preview-artwork__overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 280px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,0.3);
  border-radius: 8px 8px 0 0;
}

.preview-artwork__overlay :deep(.player-mini-isolated) {
  position: relative;
}

.preview-artwork__caption {
  padding: var(--ff-space-md) var(--ff-space-lg);
  background: var(--ff-bg);
  border-radius: 0 0 8px 8px;
}

.preview-theme--dark .preview-artwork__caption {
  background: #2a2a2a;
}

.preview-artwork__title {
  display: block;
  font-size: 1rem;
  font-weight: 600;
  color: var(--ff-text);
}

.preview-theme--dark .preview-artwork__title {
  color: #fff;
}

.preview-artwork__artist {
  font-size: 0.875rem;
  color: var(--ff-muted);
}

.preview-theme--dark .preview-artwork__artist {
  color: #888;
}

/* Product Preview - Full Width */
.preview-product {
  display: flex;
  gap: var(--ff-space-lg);
  padding: var(--ff-space-lg);
  background: var(--ff-bg);
  border-radius: 12px;
  width: 100%;
  max-width: 500px;
}

.preview-theme--dark .preview-product {
  background: #2a2a2a;
}

.preview-product__image-wrap {
  position: relative;
  width: 180px;
  height: 180px;
  flex-shrink: 0;
  overflow: visible;
}

.preview-product__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
}

.preview-product__player {
  position: absolute;
  bottom: -12px;
  right: -12px;
}

.preview-product__player :deep(.player-mini-isolated) {
  position: relative;
}

.preview-product__info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.preview-product__name {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--ff-text);
  margin: 0 0 0.5rem;
}

.preview-theme--dark .preview-product__name {
  color: #fff;
}

.preview-product__desc {
  font-size: 0.9375rem;
  color: var(--ff-muted);
  margin: 0 0 1rem;
  line-height: 1.5;
}

.preview-theme--dark .preview-product__desc {
  color: #888;
}

.preview-product__price {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--ff-text);
}

.preview-theme--dark .preview-product__price {
  color: #fff;
}

/* Profile Preview - Full Width */
.preview-profile {
  width: 100%;
  max-width: 400px;
  text-align: center;
  background: var(--ff-bg);
  border-radius: 12px;
  overflow: visible;
}

.preview-theme--dark .preview-profile {
  background: #2a2a2a;
}

.preview-profile__cover {
  position: relative;
  height: 140px;
}

.preview-profile__cover-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px 12px 0 0;
}

.preview-profile__player {
  position: absolute;
  bottom: 12px;
  right: 12px;
}

.preview-profile__player :deep(.player-mini-isolated) {
  position: relative;
}

.preview-profile__details {
  padding: var(--ff-space-lg);
  padding-top: 50px;
  position: relative;
}

.preview-profile__avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid var(--ff-bg);
  position: absolute;
  top: -40px;
  left: 50%;
  transform: translateX(-50%);
}

.preview-theme--dark .preview-profile__avatar {
  border-color: #2a2a2a;
}

.preview-profile__name {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--ff-text);
  margin: 0;
}

.preview-theme--dark .preview-profile__name {
  color: #fff;
}

.preview-profile__role {
  font-size: 0.9375rem;
  color: var(--ff-muted);
}

.preview-theme--dark .preview-profile__role {
  color: #888;
}

/* Guide Preview - Full Width */
.preview-guide {
  display: flex;
  gap: var(--ff-space-lg);
  padding: var(--ff-space-lg);
  background: var(--ff-bg);
  border-radius: 12px;
  width: 100%;
  max-width: 500px;
}

.preview-theme--dark .preview-guide {
  background: #2a2a2a;
}

.preview-guide__image-wrap {
  position: relative;
  width: 200px;
  height: 150px;
  flex-shrink: 0;
}

.preview-guide__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

.preview-guide__number {
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(0,0,0,0.7);
  color: white;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  font-size: 0.875rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}

.preview-guide__player {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.preview-guide__player :deep(.player-mini-isolated) {
  position: relative;
}

.preview-guide__info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.preview-guide__title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--ff-text);
  margin: 0 0 0.5rem;
  line-height: 1.4;
}

.preview-theme--dark .preview-guide__title {
  color: #fff;
}

.preview-guide__subtitle {
  display: block;
  font-size: 0.875rem;
  color: var(--ff-muted);
  margin-bottom: 0.25rem;
}

.preview-guide__duration {
  font-size: 0.9375rem;
  color: var(--ff-muted);
}

.preview-theme--dark .preview-guide__duration {
  color: #888;
}

/* Seller Intro Preview */
.preview-seller {
  width: 100%;
  max-width: 500px;
  background: var(--ff-bg);
  border-radius: 12px;
  overflow: hidden;
}

.preview-seller__banner {
  height: 120px;
  overflow: hidden;
}

.preview-seller__banner-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.preview-seller__content {
  padding: var(--ff-space-lg);
}

.preview-seller__header {
  display: flex;
  align-items: flex-start;
  gap: var(--ff-space-md);
  margin-bottom: var(--ff-space-md);
}

.preview-seller__avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--ff-bg);
  margin-top: -40px;
  flex-shrink: 0;
}

.preview-seller__meta {
  flex: 1;
  min-width: 0;
}

.preview-seller__shop {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--ff-text);
  margin: 0;
}

.preview-seller__seller {
  font-size: 0.875rem;
  color: var(--ff-muted);
}

.preview-seller__player {
  flex-shrink: 0;
}

.preview-seller__tagline {
  font-size: 0.9375rem;
  color: var(--ff-text);
  margin: 0 0 var(--ff-space-md);
  font-style: italic;
}

.preview-seller__stats {
  display: flex;
  align-items: center;
  gap: var(--ff-space-md);
  font-size: 0.875rem;
}

.preview-seller__rating {
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: 600;
  color: var(--ff-text);
}

.preview-seller__rating svg {
  color: #facc15;
}

.preview-seller__reviews {
  color: var(--ff-muted);
}

/* Voice Review Preview */
.preview-review {
  width: 100%;
  max-width: 400px;
  background: var(--ff-bg);
  border-radius: 12px;
  padding: var(--ff-space-lg);
}

.preview-review__header {
  display: flex;
  gap: var(--ff-space-md);
  margin-bottom: var(--ff-space-lg);
  padding-bottom: var(--ff-space-md);
  border-bottom: 1px solid var(--ff-border);
}

.preview-review__product-img {
  width: 64px;
  height: 64px;
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;
}

.preview-review__product-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.preview-review__product-name {
  font-size: 1rem;
  font-weight: 600;
  color: var(--ff-text);
  margin: 0 0 0.25rem;
}

.preview-review__stars {
  display: flex;
  gap: 2px;
}

.preview-review__voice {
  display: flex;
  align-items: center;
  gap: var(--ff-space-lg);
  margin-bottom: var(--ff-space-md);
}

.preview-review__avatar-wrap {
  position: relative;
  flex-shrink: 0;
}

.preview-review__customer-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  display: block;
}

.preview-review__player {
  position: absolute;
  bottom: -8px;
  right: -8px;
  width: 40px;
  height: 40px;
}

.preview-review__customer-info {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.preview-review__customer-name {
  font-size: 1rem;
  font-weight: 600;
  color: var(--ff-text);
}

.preview-review__verified {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.8125rem;
  color: #16a34a;
}

.preview-review__footer {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: var(--ff-muted);
}

/* Team Member Preview */
.preview-team {
  position: relative;
  width: 100%;
  max-width: 280px;
  background: var(--ff-bg);
  border-radius: 12px;
  overflow: visible;
  text-align: center;
}

.preview-team__photo-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  border-radius: 12px 12px 0 0;
  overflow: visible;
}

.preview-team__photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px 12px 0 0;
}

.preview-team__player {
  position: absolute;
  bottom: -24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  width: 48px;
  height: 48px;
}

.preview-team__info {
  padding: var(--ff-space-lg);
  padding-top: calc(var(--ff-space-lg) + 24px);
}

.preview-team__name {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--ff-text);
  margin: 0;
}

.preview-team__title {
  display: block;
  font-size: 0.9375rem;
  color: var(--ff-muted);
  margin-bottom: var(--ff-space-sm);
}

.preview-team__meta {
  display: flex;
  justify-content: center;
  gap: var(--ff-space-md);
  font-size: 0.75rem;
  color: var(--ff-muted);
}

.preview-team__dept,
.preview-team__joined {
  padding: 0.25rem 0.5rem;
  background: var(--ff-bg-subtle);
  border-radius: 4px;
}

/* Chat Voice Message Preview */
.preview-chat {
  width: 100%;
  max-width: 400px;
}

.preview-chat__bubble {
  background: var(--ff-bg);
  border-radius: 16px;
  border-top-left-radius: 4px;
  padding: var(--ff-space-md);
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
}

.preview-chat__bubble--support {
  background: linear-gradient(135deg, #eff6ff 0%, #f0fdf4 100%);
}

.preview-chat__header {
  display: flex;
  align-items: center;
  gap: var(--ff-space-sm);
  margin-bottom: var(--ff-space-sm);
}

.preview-chat__avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

.preview-chat__sender-info {
  flex: 1;
}

.preview-chat__sender {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--ff-text);
}

.preview-chat__time {
  font-size: 0.75rem;
  color: var(--ff-muted);
}

.preview-chat__voice-row {
  display: flex;
  align-items: center;
  gap: var(--ff-space-md);
  padding: var(--ff-space-sm);
  background: rgba(0,0,0,0.03);
  border-radius: 8px;
}

.preview-chat__duration {
  font-size: 0.8125rem;
  color: var(--ff-muted);
  font-variant-numeric: tabular-nums;
}

/* Property Listing Preview */
.preview-property {
  width: 100%;
  max-width: 400px;
  background: var(--ff-bg);
  border-radius: 12px;
  overflow: hidden;
  box-sizing: border-box;
}

.preview-property__image-wrap {
  position: relative;
  height: 200px;
}

.preview-property__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.preview-property__price {
  position: absolute;
  bottom: 12px;
  left: 12px;
  background: rgba(0,0,0,0.75);
  color: white;
  padding: 0.375rem 0.75rem;
  border-radius: 6px;
  font-size: 1.25rem;
  font-weight: 700;
}

.preview-property__content {
  padding: var(--ff-space-lg);
  overflow: hidden;
}

.preview-property__address {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--ff-text);
  margin: 0;
}

.preview-property__city {
  display: block;
  font-size: 0.9375rem;
  color: var(--ff-muted);
  margin-bottom: var(--ff-space-sm);
}

.preview-property__specs {
  display: flex;
  gap: var(--ff-space-md);
  font-size: 0.875rem;
  color: var(--ff-text);
  margin-bottom: var(--ff-space-lg);
  padding-bottom: var(--ff-space-md);
  border-bottom: 1px solid var(--ff-border);
}

.preview-property__specs span {
  display: flex;
  align-items: center;
  gap: 4px;
}

.preview-property__agent {
  display: flex;
  align-items: center;
  gap: var(--ff-space-sm);
}

.preview-property__agent-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.preview-property__agent-info {
  flex: 1;
  min-width: 0;
}

.preview-property__agent-name {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--ff-text);
}

.preview-property__agent-title {
  font-size: 0.75rem;
  color: var(--ff-muted);
}

.preview-property__player {
  position: relative;
  flex-shrink: 0;
  width: 48px;
  height: 48px;
}

/* Chef's Menu Note Preview */
.preview-menu {
  width: 100%;
  max-width: 400px;
  background: var(--ff-bg);
  border-radius: 12px;
  overflow: hidden;
  box-sizing: border-box;
}

.preview-menu__image-wrap {
  position: relative;
  height: 180px;
}

.preview-menu__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.preview-menu__badge {
  position: absolute;
  top: 12px;
  left: 12px;
  background: #dc2626;
  color: white;
  padding: 0.25rem 0.625rem;
  border-radius: 4px;
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

.preview-menu__content {
  padding: var(--ff-space-lg);
}

.preview-menu__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--ff-space-sm);
}

.preview-menu__dish {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--ff-text);
  margin: 0;
}

.preview-menu__price {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--ff-text);
}

.preview-menu__desc {
  font-size: 0.875rem;
  color: var(--ff-muted);
  margin: 0 0 var(--ff-space-md);
  line-height: 1.5;
}

.preview-menu__chef {
  display: flex;
  align-items: center;
  gap: var(--ff-space-lg);
  padding-top: var(--ff-space-md);
  border-top: 1px solid var(--ff-border);
}

.preview-menu__chef-label {
  font-size: 0.875rem;
  color: var(--ff-text);
  font-style: italic;
}

.preview-menu__player {
  position: relative;
  flex-shrink: 0;
  width: 48px;
  height: 48px;
}

/* Compact Mode Styles */
.example-block--compact {
  border-radius: 6px;
}

.example-block--compact .example-block__header {
  padding: var(--ff-space-xs) var(--ff-space-sm);
}

.example-block--compact .example-block__title {
  font-size: 0.75rem;
  margin-bottom: 0;
}

.example-block__preview--compact {
  padding: var(--ff-space-sm);
  min-height: 180px;
}

/* Compact preview type adjustments */
.example-block--compact .preview-artwork {
  max-width: 280px;
}

.example-block--compact .preview-artwork__image,
.example-block--compact .preview-artwork__overlay {
  height: 140px;
}

.example-block--compact .preview-artwork__caption {
  padding: var(--ff-space-xs) var(--ff-space-sm);
}

.example-block--compact .preview-artwork__title {
  font-size: 0.8125rem;
}

.example-block--compact .preview-artwork__artist {
  font-size: 0.6875rem;
}

.example-block--compact .preview-product {
  max-width: 320px;
  padding: var(--ff-space-sm);
  gap: var(--ff-space-sm);
}

.example-block--compact .preview-product__image-wrap {
  width: 80px;
  height: 80px;
}

.example-block--compact .preview-product__name {
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
}

.example-block--compact .preview-product__desc {
  font-size: 0.6875rem;
  margin-bottom: 0.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.example-block--compact .preview-product__price {
  font-size: 1rem;
}

.example-block--compact .preview-profile {
  max-width: 240px;
}

.example-block--compact .preview-profile__cover {
  height: 60px;
}

.example-block--compact .preview-profile__avatar {
  width: 48px;
  height: 48px;
  top: -24px;
  border-width: 2px;
}

.example-block--compact .preview-profile__details {
  padding: var(--ff-space-sm);
  padding-top: 28px;
}

.example-block--compact .preview-profile__name {
  font-size: 0.875rem;
}

.example-block--compact .preview-profile__role {
  font-size: 0.6875rem;
}

.example-block--compact .preview-guide {
  max-width: 300px;
  padding: var(--ff-space-sm);
  gap: var(--ff-space-sm);
}

.example-block--compact .preview-guide__image-wrap {
  width: 100px;
  height: 75px;
}

.example-block--compact .preview-guide__number {
  width: 20px;
  height: 20px;
  font-size: 0.625rem;
  top: 6px;
  left: 6px;
}

.example-block--compact .preview-guide__title {
  font-size: 0.8125rem;
  margin-bottom: 0.25rem;
}

.example-block--compact .preview-guide__subtitle,
.example-block--compact .preview-guide__duration {
  font-size: 0.6875rem;
}

.example-block--compact .preview-seller {
  max-width: 300px;
}

.example-block--compact .preview-seller__banner {
  height: 50px;
}

.example-block--compact .preview-seller__content {
  padding: var(--ff-space-sm);
}

.example-block--compact .preview-seller__avatar {
  width: 36px;
  height: 36px;
  margin-top: -24px;
  border-width: 2px;
}

.example-block--compact .preview-seller__shop {
  font-size: 0.8125rem;
}

.example-block--compact .preview-seller__seller {
  font-size: 0.625rem;
}

.example-block--compact .preview-seller__tagline {
  font-size: 0.6875rem;
  margin-bottom: var(--ff-space-xs);
}

.example-block--compact .preview-seller__stats {
  font-size: 0.625rem;
  gap: var(--ff-space-sm);
}

.example-block--compact .preview-review {
  max-width: 260px;
  padding: var(--ff-space-sm);
}

.example-block--compact .preview-review__header {
  gap: var(--ff-space-sm);
  margin-bottom: var(--ff-space-sm);
  padding-bottom: var(--ff-space-xs);
}

.example-block--compact .preview-review__product-img {
  width: 40px;
  height: 40px;
}

.example-block--compact .preview-review__product-name {
  font-size: 0.75rem;
}

.example-block--compact .preview-review__stars svg {
  width: 10px;
  height: 10px;
}

.example-block--compact .preview-review__voice {
  gap: var(--ff-space-sm);
  margin-bottom: var(--ff-space-xs);
}

.example-block--compact .preview-review__customer-avatar {
  width: 48px;
  height: 48px;
}

.example-block--compact .preview-review__player {
  width: 28px;
  height: 28px;
  bottom: -4px;
  right: -4px;
}

.example-block--compact .preview-review__customer-name {
  font-size: 0.75rem;
}

.example-block--compact .preview-review__verified {
  font-size: 0.625rem;
}

.example-block--compact .preview-review__footer {
  font-size: 0.5625rem;
}

.example-block--compact .preview-team {
  max-width: 160px;
}

.example-block--compact .preview-team__photo-wrap {
  aspect-ratio: 1;
}

.example-block--compact .preview-team__player {
  bottom: -16px;
  width: 32px;
  height: 32px;
}

.example-block--compact .preview-team__info {
  padding: var(--ff-space-sm);
  padding-top: calc(var(--ff-space-sm) + 16px);
}

.example-block--compact .preview-team__name {
  font-size: 0.8125rem;
}

.example-block--compact .preview-team__title {
  font-size: 0.6875rem;
  margin-bottom: 0.25rem;
}

.example-block--compact .preview-team__meta {
  font-size: 0.5625rem;
  gap: var(--ff-space-xs);
}

.example-block--compact .preview-team__dept,
.example-block--compact .preview-team__joined {
  padding: 0.125rem 0.25rem;
}

.example-block--compact .preview-chat {
  max-width: 260px;
}

.example-block--compact .preview-chat__bubble {
  padding: var(--ff-space-sm);
}

.example-block--compact .preview-chat__avatar {
  width: 24px;
  height: 24px;
}

.example-block--compact .preview-chat__sender {
  font-size: 0.75rem;
}

.example-block--compact .preview-chat__time {
  font-size: 0.625rem;
}

.example-block--compact .preview-chat__voice-row {
  padding: var(--ff-space-xs);
  gap: var(--ff-space-sm);
}

.example-block--compact .preview-chat__duration {
  font-size: 0.6875rem;
}

.example-block--compact .preview-property {
  max-width: 260px;
}

.example-block--compact .preview-property__image-wrap {
  height: 100px;
}

.example-block--compact .preview-property__price {
  font-size: 0.875rem;
  padding: 0.25rem 0.5rem;
}

.example-block--compact .preview-property__content {
  padding: var(--ff-space-sm);
}

.example-block--compact .preview-property__address {
  font-size: 0.8125rem;
}

.example-block--compact .preview-property__city {
  font-size: 0.6875rem;
}

.example-block--compact .preview-property__specs {
  font-size: 0.625rem;
  gap: var(--ff-space-sm);
  margin-bottom: var(--ff-space-sm);
  padding-bottom: var(--ff-space-xs);
}

.example-block--compact .preview-property__agent-avatar {
  width: 28px;
  height: 28px;
}

.example-block--compact .preview-property__agent-name {
  font-size: 0.6875rem;
}

.example-block--compact .preview-property__agent-title {
  font-size: 0.5625rem;
}

.example-block--compact .preview-property__player {
  width: 32px;
  height: 32px;
}

.example-block--compact .preview-menu {
  max-width: 260px;
}

.example-block--compact .preview-menu__image-wrap {
  height: 80px;
}

.example-block--compact .preview-menu__badge {
  font-size: 0.5rem;
  padding: 0.125rem 0.375rem;
  top: 8px;
  left: 8px;
}

.example-block--compact .preview-menu__content {
  padding: var(--ff-space-sm);
}

.example-block--compact .preview-menu__dish {
  font-size: 0.8125rem;
}

.example-block--compact .preview-menu__price {
  font-size: 0.8125rem;
}

.example-block--compact .preview-menu__desc {
  font-size: 0.625rem;
  margin-bottom: var(--ff-space-xs);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.example-block--compact .preview-menu__chef {
  gap: var(--ff-space-sm);
  padding-top: var(--ff-space-xs);
}

.example-block--compact .preview-menu__chef-label {
  font-size: 0.6875rem;
}

.example-block--compact .preview-menu__player {
  width: 32px;
  height: 32px;
}

/* Scale down player buttons in compact mode */
.example-block--compact :deep(.player-mini-isolated) {
  transform: scale(0.75);
}
</style>
