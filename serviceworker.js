const CACHE = "daveads-offline";
const offlineFallbackPage = "/";

self.addEventListener("install", function (event) {
  console.log("Install Event processing");

  event.waitUntil(
    caches.open(CACHE).then(function (cache) {
      console.log("Cached offline page during install");

      // Cache the offline fallback page during installation
      if (offlineFallbackPage === "/") {
        return cache.add(new Response("Update the value of the offlineFallbackPage constant in the serviceworker.")).catch(function(error) {
          console.error('Failed to cache offline page:', error);
        });
      }
      
      return cache.add(offlineFallbackPage).catch(function(error) {
        console.error('Failed to cache offline fallback page:', error);
      });
    })
  );
});

self.addEventListener("fetch", function (event) {
  if (event.request.method !== "GET") return;

  event.respondWith(
    fetch(event.request)
      .then(function (response) {
        console.log("Add page to offline cache: " + response.url);
        
        // Update cache with the response
        event.waitUntil(updateCache(event.request, response.clone()));
        return response;
      })
      .catch(function (error) {        
        console.log("Network request Failed. Serving content from cache: " + error);
        
        // Serve content from cache if network request fails
        return fromCache(event.request);
      })
  );
});

function fromCache(request) {
  // Check if the requested resource is in the cache
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request).then(function (matching) {
      if (!matching || matching.status === 404) {
        return Promise.reject("no-match");
      }

      return matching;
    });
  });
}

function updateCache(request, response) {
  // Update cache with the response
  return caches.open(CACHE).then(function (cache) {
    // Cache all responses, regardless of their status
    return cache.put(request, response);
  });
}
