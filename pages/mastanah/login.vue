<template>
    <form action="http://localhost:3000/api/auth/signin/mastanah-callback" method="POST">
        <input type="hidden" name="csrfToken" value="7d61b7760e68d52ebef4c0c5b4aeff0c00917be0af1ccddd30c630becba38967">
        <input type="hidden" name="callbackUrl" value="http://localhost:3000/">
        <button type="submit" class="button">
            <span>Sign in with Mastanah App</span></button>
    </form>
</template>