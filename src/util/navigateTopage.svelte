<script lang="ts">
  import { page } from '$app/stores';
  const pages = $page as unknown as {
    goto: (path: string, options?: { replaceState?: boolean }) => void;
  };
  function navigateToPage(route :string) {
    pages.goto(route);
  }
</script>