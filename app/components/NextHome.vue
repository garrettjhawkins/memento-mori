<script setup lang="ts">
defineEmits<{
  plan: []
  impact: []
}>()
</script>

<template>
  <div>
    <p class="next-section-title mb-2.5 text-[1.6rem] font-bold leading-tight tracking-[0.05em] text-[var(--black)] max-[600px]:text-[1.2rem]">
      What comes next is up to you
    </p>
    <p class="next-section-sub mb-12 text-[0.78rem] tracking-[0.1em] text-[var(--muted)]">
      This isn't a schedule. It's a starting point.
    </p>
    <div class="next-cards mx-auto flex max-[600px]:flex-col max-[600px]:items-center gap-6 justify-center">
      <div class="next-card max-[600px]:w-full max-[600px]:max-w-[480px] flex-[0_1_380px] rounded-lg border border-[var(--border)] bg-[var(--input-bg)] px-8 pb-7 pt-8 text-left">
        <p class="next-card-title mb-2 text-base font-bold uppercase tracking-[0.1em] text-[var(--black)]">Plan Your Next Chapter</p>
        <p class="next-card-desc mb-6 text-[0.78rem] leading-relaxed tracking-[0.04em] text-[var(--muted)]">Turn awareness into direction</p>
        <ul class="next-card-list mb-7 flex list-none flex-col gap-2.5">
          <li class="relative pl-4 text-[0.78rem] leading-snug tracking-[0.04em] text-[#999] before:absolute before:left-0 before:text-[var(--muted)] before:content-['–']">
            Define what matters most
          </li>
          <li class="relative pl-4 text-[0.78rem] leading-snug tracking-[0.04em] text-[#999] before:absolute before:left-0 before:text-[var(--muted)] before:content-['–']">
            Set a 90-day focus
          </li>
          <li class="relative pl-4 text-[0.78rem] leading-snug tracking-[0.04em] text-[#999] before:absolute before:left-0 before:text-[var(--muted)] before:content-['–']">
            Map your next milestone
          </li>
        </ul>
        <button type="button" class="next-card-btn block h-[42px] w-full cursor-pointer rounded-md border border-[var(--border)] bg-transparent font-[inherit] text-[0.72rem] uppercase tracking-[0.15em] text-[var(--muted)] transition-colors duration-200 hover:border-[var(--black)] hover:bg-[var(--faint)] hover:text-[var(--black)]" @click="$emit('plan')">
          Set A Goal
        </button>
      </div>
      <div class="next-card max-[600px]:w-full max-[600px]:max-w-[480px] flex-[0_1_380px] rounded-lg border border-[var(--border)] bg-[var(--input-bg)] px-8 pb-7 pt-8 text-left">
        <p class="next-card-title mb-2 text-base font-bold uppercase tracking-[0.1em] text-[var(--black)]">Make an Impact</p>
        <p class="next-card-desc mb-6 text-[0.78rem] leading-relaxed tracking-[0.04em] text-[var(--muted)]">Make your time meaningful to someone else</p>
        <ul class="next-card-list mb-7 flex list-none flex-col gap-2.5">
          <li class="relative pl-4 text-[0.78rem] leading-snug tracking-[0.04em] text-[#999] before:absolute before:left-0 before:text-[var(--muted)] before:content-['–']">
            Find causes that matter to you
          </li>
          <li class="relative pl-4 text-[0.78rem] leading-snug tracking-[0.04em] text-[#999] before:absolute before:left-0 before:text-[var(--muted)] before:content-['–']">
            Volunteer your time
          </li>
          <li class="relative pl-4 text-[0.78rem] leading-snug tracking-[0.04em] text-[#999] before:absolute before:left-0 before:text-[var(--muted)] before:content-['–']">
            Support meaningful work
          </li>
        </ul>
        <button type="button" class="next-card-btn block h-[42px] w-full cursor-pointer rounded-md border border-[var(--border)] bg-transparent font-[inherit] text-[0.72rem] uppercase tracking-[0.15em] text-[var(--muted)] transition-colors duration-200 hover:border-[var(--black)] hover:bg-[var(--faint)] hover:text-[var(--black)]" @click="$emit('impact')">
          Explore Opportunities
        </button>
      </div>
    </div>
  </div>
</template>
