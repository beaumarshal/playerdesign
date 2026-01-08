<script setup>
import MiniPlayerExampleBlock from './MiniPlayerExampleBlock.vue'

const examples = [
  // 1. Album Artwork Overlay
  {
    title: 'Album Artwork',
    description: 'Artist message or track preview overlaid on cover art',
    example: {
      type: 'artwork',
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&h=500&fit=crop',
      title: 'Midnight Drive',
      artist: 'Luna Ray',
    }
  },
  // 2. Product Sound Demo
  {
    title: 'Product Demo',
    description: 'Let customers hear the product quality',
    example: {
      type: 'product',
      image: 'https://images.unsplash.com/photo-1545127398-14699f92334b?w=180&h=180&fit=crop',
      name: 'Sonos Era 300',
      description: 'Spatial audio speaker with Dolby Atmos. Room-filling sound from a compact design.',
      price: '$449',
      tag: 'Hear it',
    }
  },
  // 3. Profile Voice Bio
  {
    title: 'Profile Bio',
    description: 'Voice introductions for social profiles and portfolios',
    example: {
      type: 'profile',
      cover: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=400&h=140&fit=crop',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
      name: 'Emma Rodriguez',
      role: 'UX Designer & Illustrator',
      location: 'San Francisco, CA',
    }
  },
  // 4. Museum Audio Guide
  {
    title: 'Audio Guide',
    description: 'Museum, gallery, or tour stop narration',
    example: {
      type: 'guide',
      image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=200&h=150&fit=crop',
      number: '07',
      title: 'The Starry Night',
      subtitle: 'Vincent van Gogh, 1889',
      duration: '2:30',
    }
  },
  // 5. Seller Voice Intro (Marketplace)
  {
    title: 'Seller Intro',
    description: 'Marketplace sellers introduce their shop personally',
    example: {
      type: 'seller',
      banner: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=500&h=160&fit=crop',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop',
      shopName: 'Woodland Ceramics',
      sellerName: 'Sarah Chen',
      location: 'Portland, OR',
      rating: '4.9',
      reviews: '2,847',
      tagline: 'Handmade pottery with love since 2015',
    }
  },
  // 6. Customer Voice Review
  {
    title: 'Voice Review',
    description: 'Authentic customer testimonials that build trust',
    example: {
      type: 'review',
      productImage: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=80&h=80&fit=crop',
      productName: 'AirPods Pro 2',
      rating: 5,
      customerName: 'Mike Richardson',
      customerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=48&h=48&fit=crop',
      date: 'Dec 28, 2025',
      helpful: 47,
      verified: true,
    }
  },
  // 7. Team Member Card
  {
    title: 'Team Member',
    description: 'Humanize your about page with voice introductions',
    example: {
      type: 'team',
      headshot: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
      name: 'Jordan Williams',
      title: 'Head of Product',
      department: 'Product Team',
      joined: 'Joined 2022',
    }
  },
  // 8. Voice Message Bubble
  {
    title: 'Voice Message',
    description: 'Chat-style voice messages for support or messaging',
    example: {
      type: 'chat',
      senderName: 'Alex from Support',
      senderAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop',
      timestamp: '2 min ago',
      isSupport: true,
      duration: '0:23',
    }
  },
  // 9. Property Listing
  {
    title: 'Property Listing',
    description: 'Real estate agents add a personal touch to listings',
    example: {
      type: 'property',
      image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=250&fit=crop',
      price: '$425,000',
      address: '2847 Oak Street',
      city: 'Austin, TX',
      beds: 3,
      baths: 2,
      sqft: '1,850',
      agentName: 'Lisa Park',
      agentAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=48&h=48&fit=crop',
      agentTitle: 'Realtor® | Park Realty',
    }
  },
  // 10. Chef's Menu Note
  {
    title: "Chef's Note",
    description: "Restaurant menus with the chef's personal touch",
    example: {
      type: 'menu',
      dishImage: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=200&fit=crop',
      dishName: 'Miso-Glazed Black Cod',
      price: '$34',
      description: '72-hour marinated, yuzu beurre blanc, seasonal vegetables, black rice',
      badge: "Chef's Favorite",
      chefName: 'Chef Tanaka',
    }
  },
]
</script>

<template>
  <div class="mini-player-examples">
    <h3 class="examples-title">Use Case Examples</h3>
    <div class="examples-list">
      <MiniPlayerExampleBlock
        v-for="item in examples"
        :key="item.title"
        :title="item.title"
        :description="item.description"
        :example="item.example"
      />
    </div>
  </div>
</template>

<style scoped>
.mini-player-examples {
  margin-top: var(--ff-space-xl);
}

.examples-title {
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--ff-muted);
  margin: 0 0 var(--ff-space-md);
}

.examples-list {
  display: flex;
  flex-direction: column;
  gap: var(--ff-space-xl);
}
</style>
