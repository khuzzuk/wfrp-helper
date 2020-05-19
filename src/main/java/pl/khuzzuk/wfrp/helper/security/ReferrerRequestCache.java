package pl.khuzzuk.wfrp.helper.security;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.security.web.savedrequest.HttpSessionRequestCache;
import org.springframework.security.web.savedrequest.SimpleSavedRequest;

class ReferrerRequestCache extends HttpSessionRequestCache {
    private static final String REQUEST_PROXY_EXECUTION_CONTINUATION = "REQUEST_PROXY_EXECUTION_CONTINUATION";

    @Override
    public void saveRequest(HttpServletRequest request, HttpServletResponse response) {
        String referrer = request.getHeader(HttpHeaders.REFERER);
        if (referrer != null) {
            //redirect back to localhost:3000 for react app proxy
            request.getSession().setAttribute(REQUEST_PROXY_EXECUTION_CONTINUATION, new SimpleSavedRequest(referrer));
        }
    }
}
