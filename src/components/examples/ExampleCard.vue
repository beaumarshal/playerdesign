<script setup>
import FullPlayer from '@/components/players/FullPlayer.vue'
import MiniPlayer from '@/components/players/MiniPlayer.vue'
import PillPlayer from '@/components/players/PillPlayer.vue'

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  playerType: {
    type: String,
    default: 'full'
  },
  example: {
    type: Object,
    default: () => ({})
  }
})
</script>

<template>
  <div class="example-card ff-card">
    <div class="example-card__label">{{ label }}</div>

    <div class="example-card__preview">
      <!-- Article Embed Example -->
      <template v-if="example.type === 'article'">
        <div class="example-article">
          <div class="example-article__header">
            <img :src="example.image" :alt="example.title" class="example-article__image" />
          </div>
          <div class="example-article__content">
            <span class="example-article__category">{{ example.category }}</span>
            <h4 class="example-article__title">{{ example.title }}</h4>
            <p class="example-article__excerpt">{{ example.excerpt }}</p>
            <div class="example-article__player">
              <FullPlayer />
            </div>
          </div>
        </div>
      </template>

      <!-- Podcast Episode Example -->
      <template v-else-if="example.type === 'podcast'">
        <div class="example-podcast">
          <div class="example-podcast__header">
            <img :src="example.artwork" :alt="example.show" class="example-podcast__artwork" />
            <div class="example-podcast__info">
              <span class="example-podcast__show">{{ example.show }}</span>
              <h4 class="example-podcast__title">{{ example.title }}</h4>
              <span class="example-podcast__meta">{{ example.date }} · {{ example.duration }}</span>
            </div>
          </div>
          <div class="example-podcast__player">
            <FullPlayer />
          </div>
        </div>
      </template>

      <!-- Course Lesson Example -->
      <template v-else-if="example.type === 'course'">
        <div class="example-course">
          <div class="example-course__header">
            <span class="example-course__module">{{ example.module }}</span>
            <h4 class="example-course__title">{{ example.title }}</h4>
            <div class="example-course__progress">
              <div class="example-course__progress-bar" :style="{ width: example.progress + '%' }"></div>
            </div>
            <span class="example-course__progress-text">{{ example.progress }}% complete</span>
          </div>
          <div class="example-course__player">
            <FullPlayer />
          </div>
        </div>
      </template>

      <!-- Landing Page Example -->
      <template v-else-if="example.type === 'landing'">
        <div class="example-landing">
          <div class="example-landing__hero">
            <h4 class="example-landing__headline">{{ example.headline }}</h4>
            <p class="example-landing__subhead">{{ example.subhead }}</p>
          </div>
          <div class="example-landing__player">
            <FullPlayer />
          </div>
          <button class="example-landing__cta">{{ example.cta }}</button>
        </div>
      </template>

      <!-- Artwork Overlay Example (Mini) -->
      <template v-else-if="example.type === 'artwork'">
        <div class="example-artwork">
          <img :src="example.image" :alt="example.title" class="example-artwork__image" />
          <div class="example-artwork__overlay">
            <MiniPlayer />
          </div>
          <div class="example-artwork__caption">
            <span class="example-artwork__title">{{ example.title }}</span>
            <span class="example-artwork__artist">{{ example.artist }}</span>
          </div>
        </div>
      </template>

      <!-- Product Card Example (Mini) -->
      <template v-else-if="example.type === 'product'">
        <div class="example-product">
          <div class="example-product__image-wrap">
            <img :src="example.image" :alt="example.name" class="example-product__image" />
            <MiniPlayer />
          </div>
          <div class="example-product__info">
            <h4 class="example-product__name">{{ example.name }}</h4>
            <p class="example-product__desc">{{ example.description }}</p>
            <span class="example-product__price">{{ example.price }}</span>
          </div>
        </div>
      </template>

      <!-- Profile Card Example (Mini) -->
      <template v-else-if="example.type === 'profile'">
        <div class="example-profile">
          <div class="example-profile__cover">
            <img :src="example.cover" alt="Cover" class="example-profile__cover-img" />
            <MiniPlayer />
          </div>
          <div class="example-profile__details">
            <img :src="example.avatar" :alt="example.name" class="example-profile__avatar" />
            <h4 class="example-profile__name">{{ example.name }}</h4>
            <span class="example-profile__role">{{ example.role }}</span>
          </div>
        </div>
      </template>

      <!-- Audio Guide Example (Mini) -->
      <template v-else-if="example.type === 'guide'">
        <div class="example-guide">
          <div class="example-guide__image-wrap">
            <img :src="example.image" :alt="example.title" class="example-guide__image" />
            <div class="example-guide__number">{{ example.number }}</div>
            <MiniPlayer />
          </div>
          <div class="example-guide__info">
            <h4 class="example-guide__title">{{ example.title }}</h4>
            <span class="example-guide__duration">{{ example.duration }}</span>
          </div>
        </div>
      </template>

      <!-- Chat Message Example (Pill) -->
      <template v-else-if="example.type === 'chat'">
        <div class="example-chat">
          <div class="example-chat__message example-chat__message--other">
            <img :src="example.otherAvatar" alt="User" class="example-chat__avatar" />
            <div class="example-chat__bubble">{{ example.otherMessage }}</div>
          </div>
          <div class="example-chat__message example-chat__message--self">
            <div class="example-chat__bubble example-chat__bubble--voice">
              <PillPlayer />
            </div>
          </div>
        </div>
      </template>

      <!-- Social Bio Example (Pill) -->
      <template v-else-if="example.type === 'social'">
        <div class="example-social">
          <img :src="example.avatar" :alt="example.name" class="example-social__avatar" />
          <h4 class="example-social__name">{{ example.name }}</h4>
          <span class="example-social__handle">{{ example.handle }}</span>
          <p class="example-social__bio">{{ example.bio }}</p>
          <div class="example-social__player">
            <PillPlayer />
          </div>
        </div>
      </template>

      <!-- Voice Note Example (Pill) -->
      <template v-else-if="example.type === 'note'">
        <div class="example-note">
          <div class="example-note__header">
            <span class="example-note__date">{{ example.date }}</span>
            <span class="example-note__tag">{{ example.tag }}</span>
          </div>
          <h4 class="example-note__title">{{ example.title }}</h4>
          <div class="example-note__player">
            <PillPlayer />
          </div>
        </div>
      </template>

      <!-- Testimonial Example (Pill) -->
      <template v-else-if="example.type === 'testimonial'">
        <div class="example-testimonial">
          <div class="example-testimonial__stars">★★★★★</div>
          <p class="example-testimonial__quote">"{{ example.quote }}"</p>
          <div class="example-testimonial__player">
            <PillPlayer />
          </div>
          <div class="example-testimonial__author">
            <img :src="example.avatar" :alt="example.name" class="example-testimonial__avatar" />
            <div>
              <span class="example-testimonial__name">{{ example.name }}</span>
              <span class="example-testimonial__company">{{ example.company }}</span>
            </div>
          </div>
        </div>
      </template>
    </div>

    <div class="example-card__description" v-if="description">{{ description }}</div>
  </div>
</template>

<style scoped>
.example-card {
  padding: var(--ff-space-md);
}

.example-card__label {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--ff-text);
  margin-bottom: var(--ff-space-sm);
}

.example-card__preview {
  background: var(--ff-bg-subtle);
  border-radius: 8px;
  overflow: hidden;
}

.example-card__description {
  font-size: 0.75rem;
  color: var(--ff-muted);
  margin-top: var(--ff-space-sm);
}

/* Article Example */
.example-article__header {
  height: 100px;
  overflow: hidden;
}

.example-article__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.example-article__content {
  padding: var(--ff-space-md);
}

.example-article__category {
  font-size: 0.625rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--ff-accent);
}

.example-article__title {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--ff-text);
  margin: 0.25rem 0 0.5rem;
  line-height: 1.3;
}

.example-article__excerpt {
  font-size: 0.75rem;
  color: var(--ff-muted);
  line-height: 1.4;
  margin: 0 0 0.75rem;
}

.example-article__player {
  margin-top: var(--ff-space-sm);
}

/* Podcast Example */
.example-podcast {
  padding: var(--ff-space-md);
}

.example-podcast__header {
  display: flex;
  gap: var(--ff-space-sm);
  margin-bottom: var(--ff-space-md);
}

.example-podcast__artwork {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
}

.example-podcast__info {
  flex: 1;
  min-width: 0;
}

.example-podcast__show {
  font-size: 0.625rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--ff-accent);
}

.example-podcast__title {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--ff-text);
  margin: 0.25rem 0;
  line-height: 1.3;
}

.example-podcast__meta {
  font-size: 0.6875rem;
  color: var(--ff-muted);
}

/* Course Example */
.example-course {
  padding: var(--ff-space-md);
}

.example-course__header {
  margin-bottom: var(--ff-space-md);
}

.example-course__module {
  font-size: 0.625rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--ff-accent);
}

.example-course__title {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--ff-text);
  margin: 0.25rem 0 0.75rem;
}

.example-course__progress {
  height: 4px;
  background: var(--ff-border);
  border-radius: 2px;
  overflow: hidden;
}

.example-course__progress-bar {
  height: 100%;
  background: var(--ff-accent);
  border-radius: 2px;
}

.example-course__progress-text {
  font-size: 0.625rem;
  color: var(--ff-muted);
  margin-top: 0.25rem;
  display: block;
}

/* Landing Example */
.example-landing {
  padding: var(--ff-space-lg);
  text-align: center;
}

.example-landing__headline {
  font-size: 1rem;
  font-weight: 700;
  color: var(--ff-text);
  margin: 0 0 0.5rem;
}

.example-landing__subhead {
  font-size: 0.75rem;
  color: var(--ff-muted);
  margin: 0 0 var(--ff-space-md);
}

.example-landing__player {
  margin-bottom: var(--ff-space-md);
}

.example-landing__cta {
  background: var(--ff-accent);
  color: white;
  border: none;
  padding: 0.5rem 1.25rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
}

/* Artwork Example (Mini) */
.example-artwork {
  position: relative;
}

.example-artwork__image {
  width: 100%;
  height: 140px;
  object-fit: cover;
  display: block;
}

.example-artwork__overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,0.3);
}

.example-artwork__caption {
  padding: var(--ff-space-sm) var(--ff-space-md);
  background: var(--ff-bg);
}

.example-artwork__title {
  display: block;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--ff-text);
}

.example-artwork__artist {
  font-size: 0.6875rem;
  color: var(--ff-muted);
}

/* Product Example (Mini) */
.example-product {
  display: flex;
  gap: var(--ff-space-md);
  padding: var(--ff-space-md);
}

.example-product__image-wrap {
  position: relative;
  width: 80px;
  height: 80px;
  flex-shrink: 0;
}

.example-product__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

.example-product__image-wrap :deep(.player-mini) {
  position: absolute;
  bottom: -8px;
  right: -8px;
  width: 28px !important;
  height: 28px !important;
}

.example-product__image-wrap :deep(.player-mini__icon) {
  width: 0.75rem !important;
  height: 0.75rem !important;
}

.example-product__info {
  flex: 1;
}

.example-product__name {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--ff-text);
  margin: 0 0 0.25rem;
}

.example-product__desc {
  font-size: 0.6875rem;
  color: var(--ff-muted);
  margin: 0 0 0.5rem;
  line-height: 1.4;
}

.example-product__price {
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--ff-text);
}

/* Profile Example (Mini) */
.example-profile {
  text-align: center;
}

.example-profile__cover {
  position: relative;
  height: 60px;
  overflow: hidden;
}

.example-profile__cover-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.example-profile__cover :deep(.player-mini) {
  position: absolute;
  bottom: 8px;
  right: 8px;
  width: 28px !important;
  height: 28px !important;
}

.example-profile__cover :deep(.player-mini__icon) {
  width: 0.75rem !important;
  height: 0.75rem !important;
}

.example-profile__details {
  padding: var(--ff-space-md);
  padding-top: 30px;
  position: relative;
}

.example-profile__avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--ff-bg-subtle);
  position: absolute;
  top: -25px;
  left: 50%;
  transform: translateX(-50%);
}

.example-profile__name {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--ff-text);
  margin: 0;
}

.example-profile__role {
  font-size: 0.6875rem;
  color: var(--ff-muted);
}

/* Guide Example (Mini) */
.example-guide {
  display: flex;
  gap: var(--ff-space-md);
  padding: var(--ff-space-md);
}

.example-guide__image-wrap {
  position: relative;
  width: 100px;
  height: 75px;
  flex-shrink: 0;
}

.example-guide__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 6px;
}

.example-guide__number {
  position: absolute;
  top: 6px;
  left: 6px;
  background: rgba(0,0,0,0.7);
  color: white;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  font-size: 0.625rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}

.example-guide__image-wrap :deep(.player-mini) {
  position: absolute;
  bottom: 50%;
  right: 50%;
  transform: translate(50%, 50%);
  width: 32px !important;
  height: 32px !important;
}

.example-guide__info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.example-guide__title {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--ff-text);
  margin: 0 0 0.25rem;
  line-height: 1.3;
}

.example-guide__duration {
  font-size: 0.6875rem;
  color: var(--ff-muted);
}

/* Chat Example (Pill) */
.example-chat {
  padding: var(--ff-space-md);
  display: flex;
  flex-direction: column;
  gap: var(--ff-space-sm);
}

.example-chat__message {
  display: flex;
  gap: var(--ff-space-xs);
  align-items: flex-end;
}

.example-chat__message--self {
  justify-content: flex-end;
}

.example-chat__avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
}

.example-chat__bubble {
  max-width: 70%;
  padding: 0.5rem 0.75rem;
  background: var(--ff-bg);
  border-radius: 12px;
  font-size: 0.75rem;
  color: var(--ff-text);
}

.example-chat__bubble--voice {
  padding: 0.25rem;
  background: transparent;
}

/* Social Example (Pill) */
.example-social {
  padding: var(--ff-space-md);
  text-align: center;
}

.example-social__avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: var(--ff-space-xs);
}

.example-social__name {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--ff-text);
  margin: 0;
}

.example-social__handle {
  font-size: 0.6875rem;
  color: var(--ff-muted);
  display: block;
  margin-bottom: var(--ff-space-xs);
}

.example-social__bio {
  font-size: 0.75rem;
  color: var(--ff-text);
  margin: 0 0 var(--ff-space-sm);
  line-height: 1.4;
}

.example-social__player {
  display: inline-block;
}

/* Note Example (Pill) */
.example-note {
  padding: var(--ff-space-md);
}

.example-note__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--ff-space-xs);
}

.example-note__date {
  font-size: 0.625rem;
  color: var(--ff-muted);
}

.example-note__tag {
  font-size: 0.5625rem;
  font-weight: 600;
  text-transform: uppercase;
  padding: 2px 6px;
  background: var(--ff-accent);
  color: white;
  border-radius: 3px;
}

.example-note__title {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--ff-text);
  margin: 0 0 var(--ff-space-sm);
}

/* Testimonial Example (Pill) */
.example-testimonial {
  padding: var(--ff-space-md);
}

.example-testimonial__stars {
  color: #f59e0b;
  font-size: 0.75rem;
  margin-bottom: var(--ff-space-xs);
}

.example-testimonial__quote {
  font-size: 0.75rem;
  color: var(--ff-text);
  font-style: italic;
  line-height: 1.5;
  margin: 0 0 var(--ff-space-sm);
}

.example-testimonial__player {
  margin-bottom: var(--ff-space-sm);
}

.example-testimonial__author {
  display: flex;
  align-items: center;
  gap: var(--ff-space-xs);
}

.example-testimonial__avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  object-fit: cover;
}

.example-testimonial__name {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--ff-text);
  display: block;
}

.example-testimonial__company {
  font-size: 0.625rem;
  color: var(--ff-muted);
}
</style>
