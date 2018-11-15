package pl.khuzzuk.wfrp.helper.util

import org.openqa.selenium.JavascriptExecutor

class VaadinUtils {
    private static final String WAIT_SCRIPT = """
    if (!window.Vaadin || !window.Vaadin.Flow) {
        return true;
    }
    var clients = window.Vaadin.Flow.clients;
    if (clients) {
        for (var client in clients) {
            if (clients[client].isActive()) {
                return false;
            }
        }
        return true;
    } else {
        return false;
    }
"""

    static void waitForUi(JavascriptExecutor executor) {
        while (!executor.executeScript(WAIT_SCRIPT)) {

        }
    }
}
