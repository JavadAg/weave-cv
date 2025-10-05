<template>
  <div class="flex flex-col hide-scrollbar overflow-y-auto h-full rounded-xl bg-default p-4 space-y-6">
    <div class="space-y-4">
      <h2
        class="text-lg flex justify-start items-center font-semibold text-default tracking-tight before:content-[''] before:w-1 before:h-6 before:bg-primary before:rounded-full before:mr-2 before:inline-block"
      >
        General
      </h2>
      <div class="space-y-3">
        <ResumeConfigsGeneralLayoutControls />
        <ResumeConfigsGeneralHeadingsControls />
        <ResumeConfigsGeneralLinksControls />
        <ResumeConfigsGeneralTypographyControls />
        <ResumeConfigsGeneralColorsControls />
      </div>
    </div>

    <div class="space-y-4">
      <h2
        class="text-lg flex justify-start items-center font-semibold text-default tracking-tight before:content-[''] before:w-1 before:h-6 before:bg-primary before:rounded-full before:mr-2 before:inline-block"
      >
        Sections
      </h2>
      <div class="space-y-3">
        <ResumeConfigsSectionsPersonalDetailsControls />
        <ResumeConfigsSectionsSummaryControls />
        <ResumeConfigsSectionsExperienceControls />
        <ResumeConfigsSectionsEducationControls />
        <ResumeConfigsSectionsProjectsControls />
        <ResumeConfigsSectionsSkillsControls />
        <ResumeConfigsSectionsLanguagesControls />
      </div>
    </div>
  </div>
</template>
