package pl.khuzzuk.wfrp.helper.security;

import com.vaadin.flow.server.ServletHelper;
import com.vaadin.flow.shared.ApplicationConstants;
import org.springframework.security.web.util.matcher.RequestMatcher;

import javax.servlet.http.HttpServletRequest;
import java.util.EnumSet;
import java.util.List;
import java.util.stream.Collectors;

class VaadinInternalRequestMatcher implements RequestMatcher {
    private static final List<String> internalIdentifiers = EnumSet.allOf(ServletHelper.RequestType.class).stream()
            .map(ServletHelper.RequestType::getIdentifier).collect(Collectors.toList());

    @Override
    public boolean matches(HttpServletRequest request) {
        String requestType = request.getParameter(ApplicationConstants.REQUEST_TYPE_PARAMETER);
        return requestType != null && internalIdentifiers.contains(requestType);
    }
}
