from unittest.mock import MagicMock

from django.test import TestCase, override_settings


class IsAsyncTasksEnabledTest(TestCase):
    @override_settings(KAMU_ENABLE_ASYNC_TASKS=True)
    def test_returns_true_when_enabled(self):
        from core.feature_toggles import is_async_tasks_enabled
        self.assertTrue(is_async_tasks_enabled())

    @override_settings(KAMU_ENABLE_ASYNC_TASKS=False)
    def test_returns_false_when_disabled(self):
        from core.feature_toggles import is_async_tasks_enabled
        self.assertFalse(is_async_tasks_enabled())

    def test_returns_false_when_setting_is_missing(self):
        from core.feature_toggles import is_async_tasks_enabled
        with self.settings():
            self.assertFalse(is_async_tasks_enabled())


class RunAsyncTaskTest(TestCase):
    @override_settings(KAMU_ENABLE_ASYNC_TASKS=True)
    def test_calls_function_when_toggle_is_on(self):
        from core.feature_toggles import run_async_task
        mock_func = MagicMock()
        run_async_task(mock_func, 42, key="value")
        mock_func.assert_called_once_with(42, key="value")

    @override_settings(KAMU_ENABLE_ASYNC_TASKS=False)
    def test_does_not_call_function_when_toggle_is_off(self):
        from core.feature_toggles import run_async_task
        mock_func = MagicMock()
        run_async_task(mock_func, 42)
        mock_func.assert_not_called()

    @override_settings(KAMU_ENABLE_ASYNC_TASKS=True)
    def test_passes_multiple_args_to_function(self):
        from core.feature_toggles import run_async_task
        mock_func = MagicMock()
        run_async_task(mock_func, 1, 2, 3)
        mock_func.assert_called_once_with(1, 2, 3)

    @override_settings(KAMU_ENABLE_ASYNC_TASKS=False)
    def test_is_safe_to_call_when_toggle_is_off(self):
        from core.feature_toggles import run_async_task
        mock_func = MagicMock()
        run_async_task(mock_func, 1, 2, 3)
        mock_func.assert_not_called()
